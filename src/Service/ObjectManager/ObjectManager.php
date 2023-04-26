<?php

namespace App\Service\ObjectManager;

use App\Entity\Objects;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\Yaml\Yaml;

class ObjectManager
{
    protected object $object;
    protected array $config;
    protected array $data;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->object = $entityManager->getRepository(Objects::class);
        $configDirectories = [__DIR__ . '/config'];
        $fileLocator = new FileLocator($configDirectories);
        $config_location = $fileLocator->locate('config.yaml');
        $this->config = Yaml::parse(file_get_contents($config_location));
    }

    // get ALL OBJECTS DATA
    public function getAllObjectsData(bool $sensors_count): array
    {
        $query = $this->object->findAll();
        foreach ($query as $key => $value) {
            $sensors_data_array[$key] = $this->getArrayOfSensorsData($value, $sensors_count);
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
    private function getArrayOfSensorsData(object $obj, bool $sensor_count): array
    {
        // saves Sensors data to array
        $arr = array();
        $arr['id'] = $obj->getId();
        $arr['name'] = $obj->getName();
        $arr['description'] = $obj->getDescription();

        count($obj->getTemp()) === 0 ?: $arr['readings']['temp'] = $obj->getTemp();
        count($obj->getHumid()) === 0 ?: $arr['readings']['humid'] = $obj->getHumid();
        count($obj->getVent()) === 0 ?: $arr['readings']['vent'] = $obj->getVent();
        count($obj->getShadow()) === 0 ?: $arr['readings']['shadow'] = $obj->getShadow();
        $obj->getBlow() === 'false' ?: $arr['readings']['blow'] = $obj->getBlow();
        $obj->getHeat() === 'false' ?: $arr['readings']['heat'] = $obj->getHeat();

        // saves objects settings to array
        if ($obj->getSettings()) {
            $settings = $obj->getSettings();
            $check_settings = $this->config['settings'];

            $arr['settings']['id'] = $settings->getId();
            $arr['settings']['name'] = $settings->getName();

            if ($check_settings['enable']['temp'] === true) {
                $check = $check_settings['temp'];
                $arr['settings']['temp_enable'] = $settings->isTempEnable();
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
                $arr['settings']['humid_enable'] = $settings->isHumidEnable();
                if ($check['humid_day'] === true) {$arr['settings']['humid_day'] = $settings->getHumidDay();}
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
                $arr['settings']['heat_enable'] = $settings->isHeatEnable();
                if ($check['heat'] === true) {$arr['settings']['heat'] = $settings->getHeat();}
                if ($check['heat_hysteresis'] === true) {$arr['settings']['heat_hysteresis'] = $settings->getHeatHysteresis();}
            }
            if ($check_settings['enable']['vent'] === true) {
                $check = $check_settings['vent'];
                $arr['settings']['vent_enable'] = $settings->isVentEnable();
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
                $arr['settings']['blow_enable'] = $settings->isBlowEnable();
                if ($check['blow'] === true) {$arr['settings']['blow'] = $settings->getBlow();}
                if ($check['blow_pause'] === true) {$arr['settings']['blow_pause'] = $settings->getBlowPause();}
            }
            if ($check_settings['enable']['shadow'] === true) {
                $check = $check_settings['shadow'];
                $arr['settings']['shadow_enable'] = $settings->isShadowEnable();
                if ($check['shadow'] === true) {$arr['settings']['shadow'] = $settings->getShadow();}
                if ($check['shadow_manual'] === true) {$arr['settings']['shadow_manual'] = $settings->getShadowManual();}
                if ($check['shadow1'] === true) {$arr['settings']['shadow1'] = $settings->getShadow1();}
                if ($check['shadow2'] === true) {$arr['settings']['shadow2'] = $settings->getShadow2();}
                if ($check['shadow3'] === true) {$arr['settings']['shadow3'] = $settings->getShadow3();}
                if ($check['shadow4'] === true) {$arr['settings']['shadow4'] = $settings->getShadow4();}
                if ($check['shadow5'] === true) {$arr['settings']['shadow5'] = $settings->getShadow5();}
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

    public function updateByArray(array $data, int $id): void
    {
        $key = array_key_first($data);
        $value = $data[$key];
        $query = $this->object->find($id);
    }
}