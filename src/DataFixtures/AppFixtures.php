<?php /** @noinspection PhpParamsInspection */

namespace App\DataFixtures;

use App\Entity\Alerts;
use App\Entity\GlobalSettings;
use App\Entity\Objects;
use App\Entity\Settings;
use App\Entity\Stats;
use App\Entity\User;
use App\Entity\Weather;
use App\Entity\WeatherStats;
use DateTime;
use DateTimeZone;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private int $object_quantity = 6;
    private int $number_of_stats = 50;

    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= $this->object_quantity; $i++) {
            $object[$i] = new Objects();
            $settings[$i] = new Settings();
            if ($i == 1) {} else {
                $object[$i]->setSettings($settings[$i]);
            }
            $this->setSettings($settings[$i], $manager, $i);
            $this->setObjects($object[$i], $manager, $i);
            $this->setStats($this->number_of_stats, $manager, $object[$i]);
            $this->setAlerts($manager, $object[$i]);
        }
        $this->setGlobalSettings($manager);
        $this->setWeather($manager);
        $this->setUser($manager);

        $manager->flush();
    }

    // OBJECTS
    public function setObjects($obj, $manager, $id): void
    {
        $obj->setName('Tunel ' . $id);
        $temp = array();
        for ($i = 0; $i < rand(1, 3); $i++) {
            $temp[$i] = $this->randFloat(-150, 350);
        }
        $obj->setTemp($temp);
        $humid = array();
        for ($i = 0; $i < rand(1, 2); $i++) {
            $humid[$i] = rand(30, 100);
        }
        $obj->setHumid($humid);
        rand(0, 5) === 0 ? $vent = array() : $vent[0] = rand(1, 100);
        $obj->setVent($vent);
        $shadow[0] = rand(1, 100);
        rand(0, 3) === 0 ? $shadow = array() : $shadow[0] = rand(1, 100);
        $obj->setShadow($shadow);
        $blow = rand(0, 1) === 0 ? 'false' : rand(0, 1);
        $obj->setBlow($blow);
        $heat = rand(0, 1) === 0 ? 'false' : rand(0, 1);
        $obj->setHeat($heat);

        $manager->persist($obj);
    }

    // SETTINGS
    public function setSettings($obj, $manager, $id): void
    {
        $obj->setName("Ustawienia " . $id);
        $temp = strval(rand(20, 30));
        $obj->setTempEnable(true);
        $obj->setTempDay($temp);
        $obj->setTempNight($temp - $this->randFloat(0, 150));
        $obj->setTempHysteresis(rand(0, 5));
        $obj->setTempControlDay(1);
        $obj->setTempControlNight(rand(0, 1));
        $obj->setTempVentClose(rand(0, 10));
        $temp_alarm_flag = rand(0, 1);
        $obj->setTempAlarmFlag($temp_alarm_flag);
        if ($temp_alarm_flag) {
            $obj->setTempAlarm(rand(30, 40));
        } else {
            $obj->setTempAlarm(rand(-20, 0));
        }
        $obj->setHumidEnable(true);
        $obj->setHumidDay(rand(30, 99));
        $obj->setHumidNight(rand(60, 99));
        $obj->setHumidHysteresis(rand(0, 30));
        $obj->setHumidControlDay(rand(0, 1));
        $obj->setHumidControlNight(rand(0, 1));
        $obj->setHumidVentStep(rand(0, 30));
        $obj->setHumidVentPause(rand(0, 30));
        $obj->setHumidVentPauseOpen(rand(0, 100));
        $obj->setHumidVentMaxOpen(rand(10, 100));
        $obj->setHumidAlarm(rand(40, 90));
        $humid_alarm_flag = rand(0, 1);
        $obj->setHumidAlarmFlag($humid_alarm_flag);
        $obj->setHumidAlarmEnable(rand(0, 1));
        $obj->setHeatEnable(true);
        $obj->setHeat(rand(1, 40));
        $obj->setHeatHysteresis(rand(1, 10));
        $obj->setVentEnable(true);
        $obj->setVent(rand(10, 100));
        $obj->setVentStepTime(rand(0, 30));
        $obj->setVentPause(rand(0, 30));
        $obj->setVentOpenCloseTime(rand(0, 30));
        $obj->setVentMaxOpenRain(rand(0, 100));
        $obj->setVentWindDelay(rand(0, 30));
        $obj->setVentRainDelay(rand(0, 30));
        $obj->setVentWeakWindMax(rand(0, 100));
        $obj->setVentStrongWindMax(rand(0, 100));
        $obj->setVentMinTemp(rand(0, 30));
        $obj->setBlowEnable(true);
        $obj->setBlow(rand(0, 30));
        $obj->setBlowPause(rand(0, 30));
        $obj->setShadowEnable(true);
        $obj->setShadow(rand(0, 100));
        $obj->setShadowManual(rand(0, 1));
        $shadow = array();
        for ($n = 0; $n < 5; $n++) {
            $shadow[$n] = ($n) ? rand(0, 15) + $shadow[$n - 1] : rand(0, 10);
        }
        $obj->setShadow1($shadow[0]);
        $obj->setShadow1($shadow[1]);
        $obj->setShadow1($shadow[2]);
        $obj->setShadow1($shadow[3]);
        $obj->setShadow1($shadow[4]);

        $manager->persist($obj);
    }

    public function setGlobalSettings($manager): void
    {
        $global_settings = new GlobalSettings();
        $global_settings->setDayBegin(rand(5, 10));
        $global_settings->setNightBegin(rand(16, 22));
        $wind = rand(5, 10);
        $global_settings->setWeakWind($wind);
        $global_settings->setStrongWind($wind + rand(5, 20));
        $sun_threshold = array();
        for ($n = 0; $n < 5; $n++) {
            $sun_threshold[$n] = ($n) ? 1000 + $sun_threshold[$n - 1] : 1000;
        }
        $global_settings->setSunThreshold1($sun_threshold[0]);
        $global_settings->setSunThreshold2($sun_threshold[1]);
        $global_settings->setSunThreshold3($sun_threshold[2]);
        $global_settings->setSunThreshold4($sun_threshold[3]);
        $global_settings->setSunThreshold5($sun_threshold[4]);

        $manager->persist($global_settings);
    }

    public function setWeather($manager): void
    {
        $weather = new Weather();
        $weather->setTemp(rand(-10, 40));
        $weather->setHumid(rand(10, 99));
        $weather->setSun(rand(0, 6000));
        $weather->setRain(rand(0, 1));
        $weather->setWind(rand(0, 100));
        $wind_direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        $weather->setWindDirection($wind_direction[rand(0, 7)]);

        $manager->persist($weather);
    }

    public function setUser($manager): void
    {
        $admin = new User();
        $admin->setUsername("admin");
        $admin->setPassword("password");
        $admin->setDescription("NAZWA FIRMY");
        $admin->setEmail("admin@email.com");
        $user = new User();
        $user->setUsername("user");
        $user->setPassword("password");
        $user->setDescription("Jan Kowalski");
        $user->setEmail("user@email.com");

        $manager->persist($admin);
        $manager->persist($user);
    }


    public function setStats(int $limit, $manager, $obj): void
    {
        $temp = 10.5;
        $weather_temp = $temp - $this->randFloat(10, 50);
        $humid = 80;
        $weather_humid = rand(60, 80);
        $time_of_day = 1;
        $day_temp = 28;
        $night_temp = 15;
        $day_humid = 50;
        $night_humid = 90;

        for ($id = 0; $id < $limit; $id++) {
            $stats[$id] = new Stats();
            $stats[$id]->setObject($obj);
            $weatherStats[$id] = new WeatherStats();
            if ($id) {
                if ($id % 12 == 0) {
                    $time_of_day = !$time_of_day;
                    $day_temp = rand(24, 32);
                    $night_temp = rand(10, 20);
                    $day_humid = rand(30, 60);
                    $night_humid = rand(80, 99);
                }
                if ($time_of_day) { // DAY
                    $temp = $this->differ($temp, 1, $day_temp + 7, 1, 15, 30, 0);
                    $weather_temp = $this->differ($weather_temp, 1, $day_temp, 1, 20, 35, 0);
                    $humid = $this->differ($humid, 0, $day_humid, 0, 2, 5, 99);
                    $weather_humid = $this->differ($weather_humid, 0, $day_humid, 0, 5, 10, 99);
                } else {            // NIGHT
                    $temp = $this->differ($temp, 0, $night_temp + 7, 1, 5, 15, 0);
                    $weather_temp = $this->differ($weather_temp, 0, $night_temp, 1, 10, 20, 0);
                    $humid = $this->differ($humid, 1, $night_humid, 0, 5, 8, 99);
                    $weather_humid = $this->differ($weather_humid, 1, $night_humid, 0, 10, 15, 99);
                }
            }
            $stats[$id]->setTemp($temp);
            $stats[$id]->setHumid($humid);
            $weatherStats[$id]->setTemp($weather_temp);
            $weatherStats[$id]->setHumid($weather_humid);
            $date = $this->getDateTime($id);
            $stats[$id]->setCreated($date);
            $weatherStats[$id]->setCreated($date);
            $manager->persist($stats[$id]);
            $manager->persist($weatherStats[$id]);
        }
    }

    public function setAlerts($manager, $obj)
    {
        $list = [[
            'attr' => 'temp',
            'value' => '3',
            'type' => 'sensor',
            'importance' => 2,
            'active' => 1
        ], [
            'attr' => 'temp',
            'value' => '#100',
            'type' => 'hardware',
            'importance' => 3,
            'active' => 1
        ], [
            'attr' => 'humid',
            'value' => '5',
            'type' => 'sensor',
            'importance' => 1,
            'active' => 0
        ]];
        for ($i = 0; $i < count($list); $i++) {
            $alerts[$i] = new Alerts();
            $alerts[$i]->setObject($obj);

            $alerts[$i]->setAttribute($list[$i]['attr']);
            $alerts[$i]->setValue($list[$i]['value']);
            $alerts[$i]->setType($list[$i]['type']);
            $alerts[$i]->setImportance($list[$i]['importance']);
            $alerts[$i]->setActive($list[$i]['active']);

            $manager->persist($alerts[$i]);
        }
    }

    public function randFloat(int $min, int $max): string
    {
        return rand($min, $max) / 10;
    }

    public function differ($value, bool $trend, int $target, bool $precision, int $min, int $max, int $upper_limit): string
    {
        if ($upper_limit && $trend && ($value >= $upper_limit)) {
            $value = $upper_limit;
        } else {
            if ($precision) {
                if ($trend) {
                    if ($value <= $target) $value += $this->randFloat($min, $max);
                    else $value -= $this->randFloat(0, 10);

                } else {
                    if ($value > $target) $value -= $this->randFloat($min, $max);
                    else $value += $this->randFloat(0, 10);
                }
            } else {
                if ($trend) {
                    if ($value <= $target) $value += rand($min, $max);
                    else $value -= rand(0, 10);

                } else {
                    if ($value > $target) $value -= rand($min, $max);
                    else $value += rand(0, 10);
                }
            }
            if ($upper_limit && ($value > $upper_limit)) $value = $upper_limit;
        }

        return $value;
    }

    public function getDateTime(int $interval): DateTime
    {
        $date = new DateTime();
        $date->format('Y-m-d : H');
        $date->setTimezone(new DateTimeZone('Europe/Warsaw'));
        $date->getTimestamp();
        $date->modify('+' . $interval . 'hour');
        return $date;
    }
}
