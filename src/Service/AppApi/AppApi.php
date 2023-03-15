<?php

namespace App\Service\AppApi;

use App\Entity\Alerts;
use App\Entity\GlobalSettings;
use App\Entity\Objects;
use App\Entity\Settings;
use App\Entity\Stats;
use App\Entity\Weather;
use App\Entity\WeatherStats;

class AppApi
{
    protected object $object;
    protected object $settings;
    protected object $global_settings;
    protected object $stats;
    protected object $alerts;
    protected object $weather;
    protected object $weather_stats;

    public function __construct()
    {
        $this->object = new Objects();
        $this->settings = new Settings();
        $this->global_settings = new GlobalSettings();
        $this->stats = new Stats();
        $this->alerts = new Alerts();
        $this->weather = new Weather();
        $this->weather_stats = new WeatherStats();
    }
}