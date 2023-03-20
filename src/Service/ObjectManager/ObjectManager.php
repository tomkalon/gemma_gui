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
        foreach ($token as $index => $value) {
            $sensors_data_array[$index] = $this->getArrayOfSensorsData($value);
            $this->data['data'][$index] = $this->getAllSensorsData($sensors_data_array[$index]);
            $this->data['display_settings']['sensors_count'][$index] = $this->getSensorsCountSettings($sensors_data_array[$index]);

        }
        $this->data['display_settings'] = $this->prepareCarouselSettings($this->data['display_settings']['sensors_count']);
        return $this->data;
    }

    // write Sensors data to array
    private function getArrayOfSensorsData($obj): array
    {
        $arr = array();
        $arr['id'] = $obj->getId();
        $arr['name'] = $obj->getName();
        $arr['temp'] = $obj->getTemp();
        $arr['humid'] = $obj->getHumid();
        $arr['vent'] = $obj->getVent();
        $arr['shadow'] = $obj->getShadow();
        $arr['blow'] = $obj->getBlow();
        $arr['heat'] = $obj->getHeat();
        return $arr;
    }

    // merge SINGLE sensors DATA of OBJECTS to ARRAYS of OBJECTS
    public function getAllSensorsData($obj): array
    {
        $data = array();

        foreach ($obj as $index => $value) {
            if (!$value === false) {
                $data[$index] = $value;
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

        foreach ($obj as $index => $value) {
            if (!$value === false) {
                if (is_array($value)) {
                    $sum = count($value);
                    $settings['sum'] += $sum;
                    $settings[$index] = $sum;
                }
                if ($index === 'blow' || $index === 'heat') {
                    $settings['sum']++;
                    $settings[$index] = 1;
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
        $columns_count_accumulator = null;
        $max_rows_count = null;

        $carousel = $this->config['config']['carousel'];

        // list all DISPLAY_SETTINGS['sensor_count'] elements - so -> all Objects
        foreach ($sensors_count as $index => $value) {
            // list all BLOCK_SIZE elements -> realize DISPLAY_SETTINGS['block_size']
            foreach ($carousel['block_size'] as $size => $count) {
                if ($value['sum'] < $size) {
                    $block_size[$index] = array(
                        $size => $count
                    );
                    break;
                }
            }
        }
        // sums the number of columns of all objects to calculate the number of pages
        foreach($block_size as $index => $value) {
            foreach ($value as $size => $arr) {
                $columns_count_accumulator += $arr['columns'];
            }
        }

        $settings['sensors_count'] = $sensors_count;
        $settings['block_size'] = $block_size;
        $settings['pages'] = intdiv($columns_count_accumulator, $carousel['max_carousel_columns']) + 1;
        return $settings;
    }
}