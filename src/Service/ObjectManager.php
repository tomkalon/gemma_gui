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
    public function autoPrepareCarouselLayout($number): string
    {
        $block_size = '';
        $sensors_count = $this->data['display_settings']['sensors_count'];
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

        foreach ($layout['block_size'] as $index => $value) {
            if ($sensors_count[$number]['sum'] < $value) {
                $block_size = $index;
                break;
            }
        }

        return $block_size;
    }

    // process the ARRAY of DATA for TWIG template -> RETURN ONE OBJECT
    public function getPreparedObject($obj, $number): array
    {
        $data = array();
        $settings = array(
            'sum' => 0
        );

        foreach ($this->readObjectSensors($obj) as $index => $value) {
            if (!$value === false) {
                $data[$index] = $value;
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
        $this->data['display_settings']['sensors_count'][$number] = $settings;
        return $data;
    }

    // get ALL OBJECTS and PREPARE THEM to TWIG TEMPLATE -> RETURN ALL OBJECTS
    public function prepareAllObjects(): array
    {
        $token = $this->object->findAll();
        foreach ($token as $index => $value) {
            $this->data['data'][$index] = $this->getPreparedObject($value, $index);
            $this->data['display_settings']['block_size'][$index] = $this->autoPrepareCarouselLayout($index);
        }

        return $this->data;
    }
}