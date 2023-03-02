<?php /** @noinspection PhpParamsInspection */

namespace App\DataFixtures;

use App\Entity\Alerts;
use App\Entity\GlobalSettings;
use App\Entity\Objects;
use App\Entity\Settings;
use App\Entity\Stats;
use App\Entity\Users;
use App\Entity\Weather;
use App\Entity\WeatherStats;
use DateTime;
use DateTimeZone;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private int $object_quantity = 5;
    private int $number_of_stats = 50;

    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= $this->object_quantity; $i++) {
            $this->setObjects($i, $manager);
            $this->setSettings($i, $manager);
        }
        $this->setGlobalSettings($manager);
        $this->setWeather($manager);
        $this->setUser($manager);
        $this->setStats($this->number_of_stats, $manager);
        $this->setAlerts($manager);

        $manager->flush();
    }

    // OBJECTS
    public function setObjects(int $i, $manager): void
    {
        $object[$i] = new Objects();
        $object[$i]->setName('Tunel ' . $i);
        $temp = $this->randFloat(-150, 350);
        $temp_diff = $this->randFloat(0, 20);
        $object[$i]->setTemp($temp);
        $object[$i]->setTemp2($temp - $temp_diff);
        $object[$i]->setHumid(rand(30, 100));
        $object[$i]->setVent(rand(1, 100));
        $object[$i]->setVent(rand(1, 100));
        $object[$i]->setShadow(rand(1, 100));
        $object[$i]->setBlow(rand(0, 1));
        $object[$i]->setHeat(rand(0, 1));

        $manager->persist($object[$i]);
    }

    // SETTINGS
    public function setSettings(int $i, $manager): void
    {
        $settings[$i] = new Settings();
        $temp = strval(rand(20, 30));
        $settings[$i]->setTempDay($temp);
        $settings[$i]->setTempNight($temp - $this->randFloat(0, 150));
        $settings[$i]->setTempHysteresis(rand(0, 5));
        $settings[$i]->setTempControlDay(1);
        $settings[$i]->setTempControlNight(rand(0, 1));
        $settings[$i]->setTempVentClose(rand(0, 10));
        $tempAlarmFlag = rand(0, 1);
        $settings[$i]->setTempAlarmFlag($tempAlarmFlag);
        if ($tempAlarmFlag) {
            $settings[$i]->setTempAlarm(rand(30, 40));
        } else {
            $settings[$i]->setTempAlarm(rand(-20, 0));
        }
        $settings[$i]->setHumid(rand(30, 99));
        $settings[$i]->setHumidHysteresis(rand(0, 30));
        $settings[$i]->setHumidControlDay(rand(0, 1));
        $settings[$i]->setHumidControlNight(rand(0, 1));
        $settings[$i]->setHumidVentStep(rand(0, 30));
        $settings[$i]->setHumidVentPause(rand(0, 30));
        $settings[$i]->setHumidVentPauseOpen(rand(0, 100));
        $settings[$i]->setHumidVentMaxOpen(rand(10, 100));
        $settings[$i]->setHumidAlarm(rand(40, 90));
        $humidAlarmFlag = rand(0, 1);
        $settings[$i]->setHumidAlarmFlag($humidAlarmFlag);
        $settings[$i]->setHumidAlarmEnable(rand(0, 1));
        $settings[$i]->setHeat(rand(1, 40));
        $settings[$i]->setHeatHysteresis(rand(1, 10));
        $settings[$i]->setVent(rand(10, 100));
        $settings[$i]->setVentStepTime(rand(0, 30));
        $settings[$i]->setVentPause(rand(0, 30));
        $settings[$i]->setVentOpenCloseTime(rand(0, 30));
        $settings[$i]->setVentMaxOpenRain(rand(0, 100));
        $settings[$i]->setVentWindDelay(rand(0, 30));
        $settings[$i]->setVentRainDelay(rand(0, 30));
        $settings[$i]->setVentWeakWindMax(rand(0, 100));
        $settings[$i]->setVentStrongWindMax(rand(0, 100));
        $settings[$i]->setVentMinTemp(rand(0, 30));
        $settings[$i]->setBlow(rand(0, 30));
        $settings[$i]->setBlowPause(rand(0, 30));
        $settings[$i]->setShadow(rand(0, 100));
        $settings[$i]->setShadowManual(rand(0, 1));
        $shadow = array();
        for ($n = 0; $n < 5; $n++) {
            $shadow[$n] = ($n) ? rand(0, 15) + $shadow[$n - 1] : rand(0, 10);
        }
        $settings[$i]->setShadow1($shadow[0]);
        $settings[$i]->setShadow1($shadow[1]);
        $settings[$i]->setShadow1($shadow[2]);
        $settings[$i]->setShadow1($shadow[3]);
        $settings[$i]->setShadow1($shadow[4]);

        $manager->persist($settings[$i]);
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
        $admin = new Users();
        $admin->setUsername("admin");
        $admin->setPassword("password");
        $admin->setDescription("NAZWA FIRMY");
        $admin->setRole("ADMIN");
        $admin->setEmail("admin@email.com");
        $user = new Users();
        $user->setUsername("user");
        $user->setPassword("password");
        $user->setDescription("Jan Kowalski");
        $user->setRole("USER");
        $user->setEmail("user@email.com");

        $manager->persist($admin);
        $manager->persist($user);
    }


    public function setStats(int $limit, $manager): void
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

    public function setAlerts($manager)
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
