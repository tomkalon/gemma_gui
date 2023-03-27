<?php

namespace App\Service\ObjectManager;

use App\Repository\ObjectsRepository;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Yaml\Yaml;

class ObjectManager
{
    protected object $object;
    protected array $config;
    protected array $data;

    public function __construct(ObjectsRepository $objectsRepository)
    {
        $this->object = $objectsRepository;
        $configDirectories = [__DIR__ . '/config'];
        $fileLocator = new FileLocator($configDirectories);
        $config_location = $fileLocator->locate('facility.yaml');
        $this->config = Yaml::parse(file_get_contents($config_location));
    }

    // get ALL OBJECTS and PREPARE THEM to DISPLAY with CAROUSEL in TWIG TEMPLATE -> RETURN ALL OBJECTS with CAROUSEL SETUP
    public function prepareAllObjectsDataForCarousel(): array
    {
        $sensors_data_array = array();

        $query = $this->object->findAll();
        foreach ($query as $key => $value) {
            $sensors_data_array[$key] = $this->getArrayOfSensorsData($value, false, null);
            $this->data['facility'][$key] = $this->getAllSensorsData($sensors_data_array[$key]);
            $this->data['carousel']['sensors_count'][$key] = $this->getSensorsCountSettings($sensors_data_array[$key]);
        }

        // carousel BLOCK_SIZE & PAGES/ALL_PAGES & MAX_ROWS
        $this->data['carousel'] = $this->prepareCarouselSetup($this->data['carousel']['sensors_count']);
//        unset($this->data['carousel']['sensors_count']);

        // applying SETTINGS to OBJECTS
        foreach (array_keys($this->data['facility']) as $key) {
            // block size name
            $this->data['facility'][$key]['carousel']['block_size'] = array_keys($this->data['carousel']['block_size'][$key])[0];
            // page number
            $this->data['facility'][$key]['carousel']['page'] = $this->data['carousel']['pages'][$key];
        }

        //remove unused DATA from carousel
        unset($this->data['carousel']['pages']);
        unset($this->data['carousel']['block_size']);

        return $this->data;

    }

    // get ALL OBJECTS DATA
    public function getAllObjectsData(bool $sensors_count, ?array $settings): array
    {
        $query = $this->object->findAll();
        foreach ($query as $key => $value) {
            $sensors_data_array[$key] = $this->getArrayOfSensorsData($value, $sensors_count, $settings);
            $this->data[$key] = $this->getAllSensorsData($sensors_data_array[$key]);
        }
        return $this->data;
    }

    // write Sensors data to array
    private function getArrayOfSensorsData(object $obj, bool $sensor_count, ?array $settings): array
    {
        $arr = array();
        $arr['id'] = $obj->getId();
        $arr['name'] = $obj->getName();
        count($obj->getTemp()) === 0 ?: $arr['readings']['temp'] = $obj->getTemp();
        count($obj->getHumid()) === 0 ?: $arr['readings']['humid'] = $obj->getHumid();
        count($obj->getVent()) === 0 ?: $arr['readings']['vent'] = $obj->getVent();
        count($obj->getShadow()) === 0 ?: $arr['readings']['shadow'] = $obj->getShadow();
        $obj->getBlow() === 'false' ?: $arr['readings']['blow'] = $obj->getBlow();
        $obj->getHeat() === 'false' ?: $arr['readings']['heat'] = $obj->getHeat();
        $arr['settings'] = $obj->getSettings();
        if (isset($arr['settings'])) {
            $arr['settings'] = $arr['settings']->getTempDay();
        }
        if ($sensor_count) {
            $arr['sensors_count'] = $this->getSensorsCountSettings($arr);
        }
        return $arr;
    }

    private function getSettings($settings): bool
    {
        return true;
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
            if (is_array($value)) {
                $sum = count($value);
                $settings['sum'] += $sum;
                $settings[$key] = $sum;
            } else {
                $settings['sum']++;
                $settings[$key] = 1;
            }
        }
        return $settings;
    }

    // if JSON file is not exist, this function create it with default structure from SENSORS_COUNT ARRAY
    private function prepareCarouselSetup($sensors_count): array
    {
        $settings = array();
        $block_size = array();
        $pages = array();
        $columns_count_accumulator = null;
        $max_rows_count = null;
        $carousel = $this->config['config']['carousel'];

        // list all carousel['sensor_count'] elements - so -> all Objects
        foreach ($sensors_count as $key => $value) {
            // list all BLOCK_SIZE elements -> realize carousel['block_size']
            foreach ($carousel['block_size'] as $size => $count) {
                if ($value['sum'] <= $count['sum']) {
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

        $max_rows_count = $carousel['max_rows'][$max_rows_count];

        $settings['sensors_count'] = $sensors_count;
        $settings['block_size'] = $block_size;
        $settings['all_pages'] = intdiv($columns_count_accumulator, $carousel['max_carousel_columns']);
        $settings['pages'] = $pages;
        $settings['max_rows'] = $max_rows_count;
        return $settings;
    }
}