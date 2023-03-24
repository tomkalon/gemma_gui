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
        $query->getTemp() === 'false' ? : $arr['temp'] = $query->getTemp();
        $query->getHumid() === 'false' ? : $arr['humid'] = $query->getHumid();
        $query->getSun() === 'false' ? : $arr['sun'] = $query->getSun();
        $query->getRain() === 'false' ? : $arr['rain'] = $query->getRain();
        $query->getWind() === 'false' ? : $arr['wind'] = $query->getWind();
        $query->getWindDirection() === 'false' ? : $arr['wind_direction'] = $query->getWindDirection();
        return $arr;
    }
}