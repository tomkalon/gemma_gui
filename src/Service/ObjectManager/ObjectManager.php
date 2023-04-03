<?php

namespace App\Service\ObjectManager;

use App\Repository\GlobalSettingsRepository;
use App\Repository\ObjectsRepository;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Yaml\Yaml;

class ObjectManager
{
    protected object $object;
    protected object $global_settings;
    protected array $config;
    protected array $data;

    public function __construct(ObjectsRepository $objectsRepository, GlobalSettingsRepository $globalSettingsRepository)
    {
        $this->object = $objectsRepository;
        $this->global_settings = $globalSettingsRepository;
        $configDirectories = [__DIR__ . '/config'];
        $fileLocator = new FileLocator($configDirectories);
        $config_location = $fileLocator->locate('config.yaml');
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

    // return DATA array dependent of $sensors_count & $request_data
    private function getArrayOfSensorsData(object $obj, bool $sensor_count, ?array $request_data): array
    {
        // saves Sensors data to array
        $arr = array();
        $arr['id'] = $obj->getId();
        $arr['name'] = $obj->getName();
        count($obj->getTemp()) === 0 ?: $arr['readings']['temp'] = $obj->getTemp();
        count($obj->getHumid()) === 0 ?: $arr['readings']['humid'] = $obj->getHumid();
        count($obj->getVent()) === 0 ?: $arr['readings']['vent'] = $obj->getVent();
        count($obj->getShadow()) === 0 ?: $arr['readings']['shadow'] = $obj->getShadow();
        $obj->getBlow() === 'false' ?: $arr['readings']['blow'] = $obj->getBlow();
        $obj->getHeat() === 'false' ?: $arr['readings']['heat'] = $obj->getHeat();

        // saves objects settings to array
        if (isset($request_data['settings']) and $request_data['settings'] === true) {
            if ($obj->getSettings()) {
                $settings = $obj->getSettings();
                $check_settings = $this->config['settings'];

                $arr['settings']['id'] = $settings->getId();
                $arr['settings']['name'] = $settings->getName();

                if ($check_settings['enable']['temp'] === true) {
                    $check = $check_settings['temp'];
                    if ($check['temp_day'] === true) {$arr['settings']['temp_day'] = $settings->getTempDay();}
                    if ($check['temp_night'] === true) {$arr['settings']['temp_night'] = $settings->getTempNight();}
                    if ($check['temp_hysteresis'] === true) {$arr['settings']['temp_hysteresis'] = $settings->getTempHysteresis();}
                    if ($check['temp_control_day'] === true) {$arr['settings']['temp_control_day'] = $settings->isTempControlDay();}
                    if ($check['temp_control_night'] === true) {$arr['settings']['temp_control_night'] = $settings->isTempControlNight();}
                    if ($check['temp_vent_close'] === true) {$arr['settings']['temp_vent_close'] = $settings->getTempVentClose();}
                    if ($check['temp_alarm'] === true) {$arr['settings']['temp_alarm'] = $settings->getTempAlarm();}
                    if ($check['temp_alarm_flag'] === true) {$arr['settings']['temp_alarm_flag'] = $settings->getTempAlarmFlag();}
                }
                if ($check_settings['enable']['humid'] === true) {
                    $check = $check_settings['humid'];
                    if ($check['humid_day'] === true) {$arr['settings']['humid_day'] = $settings->getHumidday();}
                    if ($check['humid_night'] === true) {$arr['settings']['humid_night'] = $settings->getHumidNight();}
                    if ($check['humid_hysteresis'] === true) {$arr['settings']['humid_hysteresis'] = $settings->getHumidHysteresis();}
                    if ($check['humid_control_day'] === true) {$arr['settings']['humid_control_day'] = $settings->isHumidControlDay();}
                    if ($check['humid_control_night'] === true) {$arr['settings']['humid_control_night'] = $settings->isHumidControlNight();}
                    if ($check['humid_vent_step'] === true) {$arr['settings']['humid_vent_step'] = $settings->getHumidVentStep();}
                    if ($check['humid_vent_pause'] === true) {$arr['settings']['humid_vent_pause'] = $settings->getHumidVentPause();}
                    if ($check['humid_vent_pause_open'] === true) {$arr['settings']['humid_vent_pause_open'] = $settings->getHumidVentPause();}
                    if ($check['humid_vent_max_open'] === true) {$arr['settings']['humid_vent_max_open'] = $settings->getHumidVentMaxOpen();}
                    if ($check['humid_alarm'] === true) {$arr['settings']['humid_alarm'] = $settings->getHumidAlarm();}
                    if ($check['humid_alarm_flag'] === true) {$arr['settings']['humid_alarm_flag'] = $settings->isHumidAlarmFlag();}
                    if ($check['humid_alarm_enable'] === true) {$arr['settings']['humid_alarm_enable'] = $settings->getHumidAlarmEnable();}
                }
                if ($check_settings['enable']['heat'] === true) {
                    $check = $check_settings['heat'];
                    if ($check['heat'] === true) {$arr['settings']['heat'] = $settings->getHeat();}
                    if ($check['heat_hysteresis'] === true) {$arr['settings']['heat_hysteresis'] = $settings->getHeatHysteresis();}
                }
                if ($check_settings['enable']['vent'] === true) {
                    $check = $check_settings['vent'];
                    if ($check['vent'] === true) {$arr['settings']['vent'] = $settings->getVent();}
                    if ($check['vent_step_time'] === true) {$arr['settings']['vent_step_time'] = $settings->getVentStepTime();}
                    if ($check['vent_pause'] === true) {$arr['settings']['vent_pause'] = $settings->getVentPause();}
                    if ($check['vent_open_close_time'] === true) {$arr['settings']['vent_open_close_time'] = $settings->getVentOpenCloseTime();}
                    if ($check['vent_max_open_rain'] === true) {$arr['settings']['vent_max_open_rain'] = $settings->getVentMaxOpenRain();}
                    if ($check['vent_wind_delay'] === true) {$arr['settings']['vent_wind_delay'] = $settings->getVentWindDelay();}
                    if ($check['vent_rain_delay'] === true) {$arr['settings']['vent_rain_delay'] = $settings->getVentRainDelay();}
                    if ($check['vent_weak_wind_max'] === true) {$arr['settings']['vent_weak_wind_max'] = $settings->getVentWeakWindMax();}
                    if ($check['vent_strong_wind_max'] === true) {$arr['settings']['vent_strong_wind_max'] = $settings->getVentStrongWindMax();}
                    if ($check['vent_min_temp'] === true) {$arr['settings']['vent_min_temp'] = $settings->getVentMinTemp();}
                }
                if ($check_settings['enable']['blow'] === true) {
                    $check = $check_settings['blow'];
                    if ($check['blow'] === true) {$arr['settings']['blow'] = $settings->getBlow();}
                    if ($check['blow_pause'] === true) {$arr['settings']['blow_pause'] = $settings->getBlowPause();}
                }
                if ($check_settings['enable']['shadow'] === true) {
                    $check = $check_settings['shadow'];
                    if ($check['shadow'] === true) {$arr['settings']['shadow'] = $settings->getShadow();}
                    if ($check['shadow_manual'] === true) {$arr['settings']['shadow_manual'] = $settings->getShadowManual();}
                    if ($check['shadow1'] === true) {$arr['settings']['shadow1'] = $settings->getShadow1();}
                    if ($check['shadow2'] === true) {$arr['settings']['shadow2'] = $settings->getShadow2();}
                    if ($check['shadow3'] === true) {$arr['settings']['shadow3'] = $settings->getShadow3();}
                    if ($check['shadow4'] === true) {$arr['settings']['shadow4'] = $settings->getShadow4();}
                    if ($check['shadow5'] === true) {$arr['settings']['shadow5'] = $settings->getShadow5();}
                }
            }
        }

        if (isset($request_data['alerts']) and $request_data['alerts'] === true) {
            if ($obj->getAlerts()) {

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

    // get time of the day
    public function getTime(?bool $request_time): array
    {
        $time = array();

        // global settings
        $query= $this->global_settings->findAll()[0];
        $time['settings']['day_begin'] = $query->getDayBegin();
        $time['settings']['night_begin'] = $query->getNightBegin();

        // current time
        $hour = date('H');

        if (($hour >= $time['settings']['day_begin']) and ($hour < $time['settings']['night_begin'])) {
            $time['isDay'] = true;
        }
        else {
            $time['isDay'] = false;
        }


        return $time;
    }

    // === TWIG CAROUSEL ===
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
        $carousel = $this->config['carousel'];

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