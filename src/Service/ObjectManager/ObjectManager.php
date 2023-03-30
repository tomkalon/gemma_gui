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

    // get ALL OBJECTS DATA
    public function getAllObjectsData(bool $sensors_count, ?array $request_data): array
    {
        $query = $this->object->findAll();
        foreach ($query as $key => $value) {
            $sensors_data_array[$key] = $this->getArrayOfSensorsData($value, $sensors_count, $request_data);
            $this->data[$key] = $this->getAllSensorsData($sensors_data_array[$key]);
        }
        return $this->data;
    }

    // merge SINGLE sensors DATA of OBJECTS to ARRAYS of OBJECTS
    private function getAllSensorsData($obj): array
    {
        $data = array();

        foreach ($obj as $key => $value) {
            if (!$value === false) {
                $data[$key] = $value;
            }
        }
        return $data;
    }

    // write Sensors data to array
    private function getArrayOfSensorsData(object $obj, bool $sensor_count, ?array $request_data): array
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


        if (isset($request_data['settings'])) {
            if ($obj->getSettings()) {
                $settings = $obj->getSettings();
                $req_settings = $request_data['settings'];

                if (isset($req_settings['name'])) {
                    $arr['settings']['name'] = $settings->getName();
                }
                if (isset($req_settings['temp_day'])) {
                    $arr['settings']['temp_day'] = $settings->getTempDay();
                }
                if (isset($req_settings['temp_night'])) {
                    $arr['settings']['temp_night'] = $settings->getTempNight();
                }
                if (isset($req_settings['temp_control_day'])) {
                    $arr['settings']['temp_control_day'] = $settings->isTempControlDay();
                }
                if (isset($req_settings['temp_control_night'])) {
                    $arr['settings']['temp_control_night'] = $settings->isTempControlNight();
                }
                if (isset($req_settings['humid'])) {
                    $arr['settings']['humid'] = $settings->getHumid();
                }
                if (isset($req_settings['humid_control_day'])) {
                    $arr['settings']['humid_control_day'] = $settings->isHumidControlDay();
                }
                if (isset($req_settings['humid_control_night'])) {
                    $arr['settings']['humid_control_night'] = $settings->isHumidControlNight();
                }
            }
        }

        if (isset($request_data['alerts'])) {
            if ($obj->getAlerts()) {
                $alerts = $obj->getAlerts();
                $req_alerts = $request_data['alerts'];
            }
        }

        if ($sensor_count) $arr['sensors_count'] = $this->getSensorsCountSettings($arr);

        return $arr;
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

    public function getTime(?array $request_time):array {
        $time = array();
        if (isset($request_time)) {
            for($i = 0; $i < count($request_time); $i++) {
                $time[$i] = date($request_time[$i]);
            }
        }
        return $time;
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