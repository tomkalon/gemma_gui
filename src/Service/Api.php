<?php

namespace App\Service;

use App\Repository\AlertsRepository;
use App\Repository\GlobalSettingsRepository;
use App\Repository\ObjectsRepository;
use App\Repository\SettingsRepository;
use App\Repository\StatsRepository;
use App\Repository\WeatherRepository;
use App\Repository\WeatherStatsRepository;

class Api
{
    protected object $object;
    protected object $setting;
    protected object $global_setting;
    protected object $stat;
    protected object $alert;
    protected object $weather;
    protected object $weather_stat;
    protected int $config;

    public function __construct($config, AlertsRepository $alerts, GlobalSettingsRepository $global_settings, ObjectsRepository $objects, SettingsRepository $settings, StatsRepository $stats, WeatherRepository $weather, WeatherStatsRepository $weather_stats)
    {
        $this->object = $objects;
        $this->setting = $settings;
        $this->global_setting = $global_settings;
        $this->stat = $stats;
        $this->alert = $alerts;
        $this->weather = $weather;
        $this->weather_stat = $weather_stats;
        $this->config = (int) $config;
    }

    public function getIdList(): int
    {
        return $this->object->findID();
    }

    public function getLocalSettings()
    {
        $yaml = null;
        return $yaml;
    }

    public function getPreparedObject($obj): array
    {
        $data = array();
        $data['id'] = $obj->getId();
        $data['name'] = $obj->getName();
        $data['temp'] = $obj->getTemp();
        $data['humid'] = $obj->getHumid();
        $data['vent'] = $obj->getVent();
        $data['shadow'] = $obj->getShadow();
        $data['blow'] = $obj->getBlow();
        $data['heat'] = $obj->getHeat();
        return $data;
    }

    public function prepareAllObjects(): array
    {
        $data = array();
        $token = $this->object->findAll();
        $token[6] = $this->config;

        return $token;
    }
}