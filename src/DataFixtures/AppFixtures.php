<?php /** @noinspection PhpParamsInspection */

namespace App\DataFixtures;

use App\Entity\GlobalSettings;
use App\Entity\Objects;
use App\Entity\Settings;
use App\Entity\Stats;
use App\Entity\Users;
use App\Entity\Weather;
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

        $manager->flush();
    }

    // OBJECTS
    public function setObjects(int $i, $manager): void
    {
        $object[$i] = new Objects();
        $object[$i]->setName('Tunel ' . $i);
        $temp = $this->randFloat(-15, 35);
        $temp_diff = $this->randFloat(0, 2);
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
        $settings[$i]->setTempNight($temp - $this->randFloat(0, 15));
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
        $humid = 50;
        $time_of_day = 1;
        $day_temp = rand(18, 32);
        $night_temp = rand(5, 15);

        for ($id = 0; $id < $limit; $id++) {
            $stats[$id] = new Stats();
            if ($id) {
                if ($id % 12 == 0) {
                    $time_of_day = !$time_of_day;
                    $day_temp = rand(18, 32);
                    $night_temp = rand(5, 15);
                }

                if ($time_of_day) {
                    $temp = $this->differ($temp, 1, $day_temp);
                } else {
                    $temp = $this->differ($temp, 0, $night_temp);
                }

                $stats[$id]->setBlow($time_of_day);
                $stats[$id]->setShadow($day_temp);
                $stats[$id]->setVent($night_temp);
                $stats[$id]->setTemp($temp);

            } else {
                $stats[$id]->setTemp($temp);
                $stats[$id]->setHumid($humid);
            }

            $date = $this->getDateTime($id);
            $stats[$id]->setCreated($date);
            $manager->persist($stats[$id]);
        }
    }

    public function randFloat(int $min, int $max): string
    {
        return rand($min, $max) . '.' . rand(0, 9);
    }

    public function differ($value, bool $trend, int $target): string
    {
        if ($trend) {
            if ($value < $target) $value += $this->randFloat(1, 2);
            else $value -= $this->randFloat(0, 1);

        } else {
            if ($value > $target) $value -= $this->randFloat(1, 2);
            else $value += $this->randFloat(0, 1);
        }
        return $value;
    }

    public function getDateTime(int $interval) : DateTime
    {
        $date = new DateTime();
        $date->format('Y-m-d : H');
        $date->setTimezone(new DateTimeZone('Europe/Warsaw'));
        $date->getTimestamp();
        $date->modify('+' . $interval . 'hour');
        return $date;
    }
}
