<?php

namespace App\Service\ObjectManager;

use Symfony\Component\Config\FileLocator;
use Symfony\Component\Yaml\Yaml;

class ObjectManager
{
    protected object $object;
    protected object $setting;
    protected object $global_setting;
    protected object $stat;
    protected object $alert;
    protected object $weather;
    protected object $weather_stat;
    protected array $config;


    protected array $data = [
        'display_settings' => array()
    ];

    public function __construct($alerts, $global_settings, $objects, $settings, $stats, $weather, $weather_stats)
    {
        $this->object = $objects;
        $this->setting = $settings;
        $this->global_setting = $global_settings;
        $this->stat = $stats;
        $this->alert = $alerts;
        $this->weather = $weather;
        $this->weather_stat = $weather_stats;
        $configDirectories = [__DIR__ . '/config'];
        $fileLocator = new FileLocator($configDirectories);
        $config_location = $fileLocator->locate('facility.yaml');
        $this->config = Yaml::parse(file_get_contents($config_location));
    }

    // get ALL OBJECTS and PREPARE THEM to TWIG TEMPLATE -> RETURN ALL OBJECTS
    public function prepareAllObjectsToDisplay(): array
    {
        $sensors_data_array = array();

        $token = $this->object->findAll();
        foreach ($token as $key => $value) {
            $sensors_data_array[$key] = $this->getArrayOfSensorsData($value);
            $this->data['facility'][$key] = $this->getAllSensorsData($sensors_data_array[$key]);
            $this->data['display_settings']['sensors_count'][$key] = $this->getSensorsCountSettings($sensors_data_array[$key]);
        }

        // set display SETTINGS to Carousel
        $this->data['display_settings'] = $this->prepareCarouselSettings($this->data['display_settings']['sensors_count']);

        // applying SETTINGS to OBJECTS
        foreach (array_keys($this->data['facility']) as $key) {
            $this->data['facility'][$key]['display']['block_size'] = $this->data['display_settings']['block_size'][$key];
            $this->data['facility'][$key]['display']['page'] = $this->data['display_settings']['pages'][$key];
        }
        return $this->data;
    }

    // write Sensors data to array
    private function getArrayOfSensorsData($obj): array
    {
        $arr = array();
        $arr['id'] = $obj->getId();
        $arr['name'] = $obj->getName();
        $arr['readings']['temp'] = $obj->getTemp();
        $arr['readings']['humid'] = $obj->getHumid();
        $arr['readings']['vent'] = $obj->getVent();
        $arr['readings']['shadow'] = $obj->getShadow();
        $arr['readings']['blow'] = $obj->getBlow();
        $arr['readings']['heat'] = $obj->getHeat();
        return $arr;
    }

    // merge SINGLE sensors DATA of OBJECTS to ARRAYS of OBJECTS
    public function getAllSensorsData($obj): array
    {
        $data = array();

        foreach ($obj as $key => $value) {
            if (!$value === false) {
                $data[$key] = $value;
            }
        }
        return $data;
    }

    // retrieves information on the number of sensors in the ONE facility
    private function getSensorsCountSettings($obj): array
    {
        $settings = array(
            'sum' => 0
        );

        $readings = $obj['readings'];

        foreach ($readings as $key => $value) {
            if (!$value === false) {
                if (is_array($value)) {
                    $sum = count($value);
                    $settings['sum'] += $sum;
                    $settings[$key] = $sum;
                } else {
                    $settings['sum']++;
                    $settings[$key] = 1;
                }
            }
        }

        return $settings;
    }

    // if JSON file is not exist, this function create it with default structure from SENSORS_COUNT ARRAY
    private function prepareCarouselSettings($sensors_count): array
    {
        $settings = array();
        $block_size = array();
        $pages = array();
        $columns_count_accumulator = null;
        $max_rows_count = null;
        $carousel = $this->config['config']['carousel'];

        // list all DISPLAY_SETTINGS['sensor_count'] elements - so -> all Objects
        foreach ($sensors_count as $key => $value) {
            // list all BLOCK_SIZE elements -> realize DISPLAY_SETTINGS['block_size']
            foreach ($carousel['block_size'] as $size => $count) {
                if ($value['sum'] < $size) {
                    $block_size[$key] = array(
                        $size => $count
                    );
                    break;
                }
            }
        }

        // sums the number of columns of all objects to calculate the number of pages
        foreach ($block_size as $key => $value) {
            $i = 0;
            foreach ($value as $arr) {
                $columns_count_accumulator += $arr['columns'];
                if ($arr['rows'] > $max_rows_count) $max_rows_count = $arr['rows'];
                $quotient = ($carousel['max_carousel_columns'] * ($i + 1) / $columns_count_accumulator);
                if ($quotient < 1) {
                    $i++;
                }
                $pages[$key] = $i;
            }
        }
        $settings['sensors_count'] = $sensors_count;
        $settings['block_size'] = $block_size;
        $settings['all_pages'] = intdiv($columns_count_accumulator, $carousel['max_carousel_columns']);
        $settings['pages'] = $pages;
        $settings['max_rows'] = $max_rows_count;
        return $settings;
    }
}