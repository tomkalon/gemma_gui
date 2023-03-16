<?php

namespace App\Service\App;

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

    public function __construct(AlertsRepository $alerts, GlobalSettingsRepository $global_settings, ObjectsRepository $objects, SettingsRepository $settings, StatsRepository $stats, WeatherRepository $weather, WeatherStatsRepository $weather_stats)
    {
        $this->object = $objects;
        $this->setting = $settings;
        $this->global_setting = $global_settings;
        $this->stat = $stats;
        $this->alert = $alerts;
        $this->weather = $weather;
        $this->weather_stat = $weather_stats;
    }

    public function getOneObject(int $id) : array
    {
        $token = $this->object->find($id);
        return $token;
    }
}