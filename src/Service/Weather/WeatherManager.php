<?php

namespace App\Service\Weather;

use App\Repository\WeatherRepository;

class WeatherManager
{
    private object $weather;

    public function __construct(WeatherRepository $weatherRepository)
    {
        $this->weather = $weatherRepository;
    }

    public function getWeatherData(): array
    {
        $arr = array();
        $query = $this->weather->findAll()[0];
        $arr['temp'] = $query->getTemp();
        $arr['humid'] = $query->getHumid();
        $arr['sun'] = $query->getSun();
        $arr['rain'] = $query->getRain();
        $arr['wind'] = $query->getWind();
        $arr['wind_direction'] = $query->getWindDirection();
        return $arr;
    }
}