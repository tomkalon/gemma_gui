<?php

namespace App\Service;

class ObjectManager
{
    protected object $object;
    protected object $setting;
    protected object $global_setting;
    protected object $stat;
    protected object $alert;
    protected object $weather;
    protected object $weather_stat;

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
    }

    // write Sensors data to array
    public function readObjectSensors($obj): array
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

    // if JSON file is not exist, this function create it with default structure
    public function autoPrepareCarouselLayout(): array
    {
        $display_settings = array();
        $layout = array(
            'carousel_columns' => 12,
            'carousel_rows' => 3,
            'block_size' => array(
                'sm' => 4,
                'md' => 6,
                'lg' => 9,
                'xl' => 12,
                'xxl' => 15
            ),
            'block_weight' => array()
        );

        /*
            Jako argument trzeba będzie dodać $sensor_count każdego obiektu,
            a wobec tego, zapewne trzeba zmodyfikować getPreparedObject,
            by zapisywał te informacje w jednej tablicy w $this->data;

        */

        if ($sensor_count['temp'] <= 3 && $sensor_count['humid'] <= 3) {
            foreach ($layout['block_size'] as $index => $value) {
                if ($sensor_count['sum'] < $value)
                {
                    $display_settings['block_size'][$number] = $index;
                    break;
                }
            }
        }



        return  $display_settings;
    }

    // process the ARRAY of DATA for TWIG template -> RETURN ONE OBJECT
    public function getPreparedObject($obj): array
    {
        $data = array(
            'sensors_count' => array(
                'sum' => 0
            ),
        );

        foreach ($this->readObjectSensors($obj) as $index => $value) {
            if (!$value === false) {
                $data[$index] = $value;
                if (is_array($value)) {
                    $sum = count($value);
                    $data['sensors_count']['sum'] += $sum;
                    $data['sensors_count'][$index] = $sum;
                }
                if ($index === 'blow' || $index === 'heat') $data['sensors_count']['sum']++;
            }
        }
        return $data;
    }

    // get ALL OBJECTS and PREPARE THEM to TWIG TEMPLATE -> RETURN ALL OBJECTS
    public function prepareAllObjects(): array
    {
        $token = $this->object->findAll();
        foreach ($token as $index => $value) {
            $this->data['data'][$index] = $this->getPreparedObject($value);
        }

        return $this->data;
    }
}