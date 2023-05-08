<?php

namespace App\Service\GlobalSettingsManager;

use App\Entity\GlobalSettings;
use Doctrine\ORM\EntityManagerInterface;

class GlobalSettingsManager
{
    protected object $global_settings;
    protected object $entity_manager;

    public function __construct(EntityManagerInterface $entityManager) {
        $this->global_settings = $entityManager->getRepository(GlobalSettings::class);
        $this->entity_manager = $entityManager;
    }

    public function getGlobalSettings(): array {

        $global = array();

        // global settings
        $query= $this->global_settings->findAll()[0];
        $global['day_begin'] = $query->getDayBegin();
        $global['night_begin'] = $query->getNightBegin();
        $global['weak_wind'] = $query->getWeakWind();
        $global['strong_wind'] = $query->getStrongWind();
        $global['sun_threshold1'] = $query->getSunThreshold1();
        $global['sun_threshold2'] = $query->getSunThreshold2();
        $global['sun_threshold3'] = $query->getSunThreshold3();
        $global['sun_threshold4'] = $query->getSunThreshold4();
        $global['sun_threshold5'] = $query->getSunThreshold5();

        return $global;
    }

    // get time of the day
    public function getTime(): array
    {
        $time = array();

        // global settings
        $query= $this->global_settings->findAll()[0];
        $day_begin = $query->getDayBegin();
        $night_begin = $query->getNightBegin();

        // current time
        $hour = date('H');

        if (($hour >= $day_begin) and ($hour < $night_begin)) {
            $time['isDay'] = true;
        }
        else {
            $time['isDay'] = false;
        }
        return $time;
    }

    // update DATABASE by single array pair :: column_name -> value
    public function updateByArray(array $data): int
    {
        return $this->global_settings->update($data['name'], $data['value']);
    }
}