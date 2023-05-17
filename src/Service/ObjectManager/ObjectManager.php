<?php

namespace App\Service\ObjectManager;

use App\Entity\Alerts;
use App\Entity\Objects;
use Doctrine\ORM\EntityManagerInterface;

class ObjectManager
{
    protected object $object;
    protected object $alerts;
    protected object $entity_manager;
    protected array $data;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->object = $entityManager->getRepository(Objects::class);
        $this->alerts = $entityManager->getRepository(Alerts::class);
        $this->entity_manager = $entityManager;
    }

    // get ALL OBJECTS DATA
    public function getAllObjectsData(bool $sensors_count): array
    {
        $query = $this->object->findAll();
        foreach ($query as $key => $value) {
            $sensors_data_array[$key] = $this->getArrayOfSensorsData($value, $sensors_count);
            $this->data[$sensors_data_array[$key]['id']] = $this->getAllSensorsData($sensors_data_array[$key]);
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
        $arr['type'] = $obj->getType();
        $arr['image'] = $obj->getImage();

        count($obj->getTemp()) === 0 ?: $arr['readings']['temp'] = $obj->getTemp();
        count($obj->getHumid()) === 0 ?: $arr['readings']['humid'] = $obj->getHumid();
        count($obj->getVent()) === 0 ?: $arr['readings']['vent'] = $obj->getVent();
        count($obj->getShadow()) === 0 ?: $arr['readings']['shadow'] = $obj->getShadow();
        $obj->getBlow() === 'false' ?: $arr['readings']['blow'] = $obj->getBlow();
        $obj->getHeat() === 'false' ?: $arr['readings']['heat'] = $obj->getHeat();

        // saves objects settings to array
        if ($obj->getSettings()) {
            $settings = $obj->getSettings();
            $arr['settings']['id'] = $settings->getId();
            $arr['settings']['name'] = $settings->getName();

            $arr['settings']['temp_day'] = $settings->getTempDay();
            $arr['settings']['temp_night'] = $settings->getTempNight();
            $arr['settings']['temp_hysteresis'] = $settings->getTempHysteresis();
            $arr['settings']['temp_control_day'] = $settings->isTempControlDay();
            $arr['settings']['temp_control_night'] = $settings->isTempControlNight();
            $arr['settings']['temp_vent_close'] = $settings->getTempVentClose();
            $arr['settings']['temp_alarm'] = $settings->getTempAlarm();
            $arr['settings']['temp_alarm_flag'] = $settings->getTempAlarmFlag();

            $arr['settings']['humid_day'] = $settings->getHumidDay();
            $arr['settings']['humid_night'] = $settings->getHumidNight();
            $arr['settings']['humid_hysteresis'] = $settings->getHumidHysteresis();
            $arr['settings']['humid_control_day'] = $settings->isHumidControlDay();
            $arr['settings']['humid_control_night'] = $settings->isHumidControlNight();
            $arr['settings']['humid_vent_step'] = $settings->getHumidVentStep();
            $arr['settings']['humid_vent_pause'] = $settings->getHumidVentPause();
            $arr['settings']['humid_vent_pause_open'] = $settings->getHumidVentPause();
            $arr['settings']['humid_vent_max_open'] = $settings->getHumidVentMaxOpen();
            $arr['settings']['humid_alarm'] = $settings->getHumidAlarm();
            $arr['settings']['humid_alarm_flag'] = $settings->isHumidAlarmFlag();
            $arr['settings']['humid_alarm_enable'] = $settings->getHumidAlarmEnable();

            $arr['settings']['vent'] = $settings->getVent();
            $arr['settings']['vent_step_time'] = $settings->getVentStepTime();
            $arr['settings']['vent_pause'] = $settings->getVentPause();
            $arr['settings']['vent_open_close_time'] = $settings->getVentOpenCloseTime();
            $arr['settings']['vent_max_open_rain'] = $settings->getVentMaxOpenRain();
            $arr['settings']['vent_wind_delay'] = $settings->getVentWindDelay();
            $arr['settings']['vent_rain_delay'] = $settings->getVentRainDelay();
            $arr['settings']['vent_weak_wind_max'] = $settings->getVentWeakWindMax();
            $arr['settings']['vent_strong_wind_max'] = $settings->getVentStrongWindMax();
            $arr['settings']['vent_min_temp'] = $settings->getVentMinTemp();

            $arr['settings']['shadow'] = $settings->getShadow();
            $arr['settings']['shadow_manual'] = $settings->getShadowManual();
            $arr['settings']['shadow1'] = $settings->getShadow1();
            $arr['settings']['shadow2'] = $settings->getShadow2();
            $arr['settings']['shadow3'] = $settings->getShadow3();
            $arr['settings']['shadow4'] = $settings->getShadow4();
            $arr['settings']['shadow5'] = $settings->getShadow5();

            $arr['settings']['heat'] = $settings->getHeat();
            $arr['settings']['heat_hysteresis'] = $settings->getHeatHysteresis();

            $arr['settings']['blow'] = $settings->getBlow();
            $arr['settings']['blow_pause'] = $settings->getBlowPause();
        }

        if ($obj->getAlerts()) {
            $sensor_alerts = $this->alerts->findActiveByType($arr['id'], 'sensor');
            $hardware_alerts = $this->alerts->findActiveByType($arr['id'], 'hardware');
            if (count($sensor_alerts)) {
                $arr['alerts']['sensor'] = $this->getAlertsData($sensor_alerts);
            }
            if (count($hardware_alerts)) {
                $arr['alerts']['hardware'] = $this->getAlertsData($hardware_alerts);
            }
        }

        if ($sensor_count) $arr['sensors_count'] = $this->getSensorsCountSettings($arr);

        return $arr;
    }

    private function getAlertsData($alerts): array
    {
        $arr = array();
        foreach ($alerts as $key => $item) {
            $arr[$key]['id'] = $item->getId();
            $arr[$key]['attribute'] = $item->getAttribute();
            $arr[$key]['value'] = $item->getValue();
            $arr[$key]['isRead'] = $item->isIsRead();
            $arr[$key]['isActive'] = $item->isisActive();
        }
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

    // update DATABASE by single array pair :: column_name -> value
    public function updateByArray(array $data, int $id): int
    {
        return $this->object->update($id, $data['name'], $data['value']);
    }
}