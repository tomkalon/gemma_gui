<?php

namespace App\Entity;

use App\Repository\SettingsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SettingsRepository::class)]
class Settings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp_day = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp_night = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp_hysteresis = null;

    #[ORM\Column(nullable: true)]
    private ?bool $temp_control_day = null;

    #[ORM\Column(nullable: true)]
    private ?bool $temp_control_night = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp_vent_close = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp_alarm = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp_alarm_flag = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid_hysteresis = null;

    #[ORM\Column(nullable: true)]
    private ?bool $humid_control_day = null;

    #[ORM\Column(nullable: true)]
    private ?bool $humid_control_night = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid_vent_step = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid_vent_pause = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid_vent_pause_open = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid_vent_max_open = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid_alarm = null;

    #[ORM\Column(nullable: true)]
    private ?bool $humid_alarm_flag = null;

    #[ORM\Column(nullable: true)]
    private ?bool $humid_alarm_enable = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $heat = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $heat_hysteresis = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_step_time = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_pause = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_open_close_time = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_max_open_rain = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_wind_delay = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_rain_delay = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_weak_wind_max = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_strong_wind_max = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent_min_temp = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $blow = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $blow_pause = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow_manual = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow3 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow4 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow5 = null;

    #[ORM\OneToMany(mappedBy: 'settings', targetEntity: Objects::class)]
    private Collection $object;

    public function __construct()
    {
        $this->object = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getTempDay(): ?string
    {
        return $this->temp_day;
    }

    public function setTempDay(?string $temp_day): self
    {
        $this->temp_day = $temp_day;

        return $this;
    }

    public function getTempNight(): ?string
    {
        return $this->temp_night;
    }

    public function setTempNight(?string $temp_night): self
    {
        $this->temp_night = $temp_night;

        return $this;
    }

    public function getTempHysteresis(): ?string
    {
        return $this->temp_hysteresis;
    }

    public function setTempHysteresis(?string $temp_hysteresis): self
    {
        $this->temp_hysteresis = $temp_hysteresis;

        return $this;
    }

    public function isTempControlDay(): ?bool
    {
        return $this->temp_control_day;
    }

    public function setTempControlDay(?bool $temp_control_day): self
    {
        $this->temp_control_day = $temp_control_day;

        return $this;
    }

    public function isTempControlNight(): ?bool
    {
        return $this->temp_control_night;
    }

    public function setTempControlNight(?bool $temp_control_night): self
    {
        $this->temp_control_night = $temp_control_night;

        return $this;
    }

    public function getTempVentClose(): ?string
    {
        return $this->temp_vent_close;
    }

    public function setTempVentClose(?string $temp_vent_close): self
    {
        $this->temp_vent_close = $temp_vent_close;

        return $this;
    }

    public function getTempAlarm(): ?string
    {
        return $this->temp_alarm;
    }

    public function setTempAlarm(?string $temp_alarm): self
    {
        $this->temp_alarm = $temp_alarm;

        return $this;
    }

    public function getTempAlarmFlag(): ?string
    {
        return $this->temp_alarm_flag;
    }

    public function setTempAlarmFlag(?string $temp_alarm_flag): self
    {
        $this->temp_alarm_flag = $temp_alarm_flag;

        return $this;
    }

    public function getHumid(): ?string
    {
        return $this->humid;
    }

    public function setHumid(?string $humid): self
    {
        $this->humid = $humid;

        return $this;
    }

    public function getHumidHysteresis(): ?string
    {
        return $this->humid_hysteresis;
    }

    public function setHumidHysteresis(?string $humid_hysteresis): self
    {
        $this->humid_hysteresis = $humid_hysteresis;

        return $this;
    }

    public function isHumidControlDay(): ?bool
    {
        return $this->humid_control_day;
    }

    public function setHumidControlDay(?bool $humid_control_day): self
    {
        $this->humid_control_day = $humid_control_day;

        return $this;
    }

    public function isHumidControlNight(): ?bool
    {
        return $this->humid_control_night;
    }

    public function setHumidControlNight(?bool $humid_control_night): self
    {
        $this->humid_control_night = $humid_control_night;

        return $this;
    }

    public function getHumidVentStep(): ?string
    {
        return $this->humid_vent_step;
    }

    public function setHumidVentStep(?string $humid_vent_step): self
    {
        $this->humid_vent_step = $humid_vent_step;

        return $this;
    }

    public function getHumidVentPause(): ?string
    {
        return $this->humid_vent_pause;
    }

    public function setHumidVentPause(?string $humid_vent_pause): self
    {
        $this->humid_vent_pause = $humid_vent_pause;

        return $this;
    }

    public function getHumidVentPauseOpen(): ?string
    {
        return $this->humid_vent_pause_open;
    }

    public function setHumidVentPauseOpen(?string $humid_vent_pause_open): self
    {
        $this->humid_vent_pause_open = $humid_vent_pause_open;

        return $this;
    }

    public function getHumidVentMaxOpen(): ?string
    {
        return $this->humid_vent_max_open;
    }

    public function setHumidVentMaxOpen(?string $humid_vent_max_open): self
    {
        $this->humid_vent_max_open = $humid_vent_max_open;

        return $this;
    }

    public function getHumidAlarm(): ?string
    {
        return $this->humid_alarm;
    }

    public function setHumidAlarm(?string $humid_alarm): self
    {
        $this->humid_alarm = $humid_alarm;

        return $this;
    }

    public function isHumidAlarmFlag(): ?bool
    {
        return $this->humid_alarm_flag;
    }

    public function setHumidAlarmFlag(bool $humid_alarm_flag): self
    {
        $this->humid_alarm_flag = $humid_alarm_flag;

        return $this;
    }

    public function getHumidAlarmEnable(): ?bool
    {
        return $this->humid_alarm_enable;
    }

    public function setHumidAlarmEnable(?bool $humid_alarm_enable): void
    {
        $this->humid_alarm_enable = $humid_alarm_enable;
    }

    public function getHeat(): ?string
    {
        return $this->heat;
    }

    public function setHeat(?string $heat): self
    {
        $this->heat = $heat;

        return $this;
    }

    public function getHeatHysteresis(): ?string
    {
        return $this->heat_hysteresis;
    }

    public function setHeatHysteresis(?string $heat_hysteresis): self
    {
        $this->heat_hysteresis = $heat_hysteresis;

        return $this;
    }

    public function getVent(): ?string
    {
        return $this->vent;
    }

    public function setVent(?string $vent): self
    {
        $this->vent = $vent;

        return $this;
    }

    public function getVentStepTime(): ?string
    {
        return $this->vent_step_time;
    }

    public function setVentStepTime(?string $vent_step_time): self
    {
        $this->vent_step_time = $vent_step_time;

        return $this;
    }

    public function getVentPause(): ?string
    {
        return $this->vent_pause;
    }

    public function setVentPause(?string $vent_pause): self
    {
        $this->vent_pause = $vent_pause;

        return $this;
    }

    public function getVentOpenCloseTime(): ?string
    {
        return $this->vent_open_close_time;
    }

    public function setVentOpenCloseTime(?string $vent_open_close_time): self
    {
        $this->vent_open_close_time = $vent_open_close_time;

        return $this;
    }

    public function getVentMaxOpenRain(): ?string
    {
        return $this->vent_max_open_rain;
    }

    public function setVentMaxOpenRain(?string $vent_max_open_rain): self
    {
        $this->vent_max_open_rain = $vent_max_open_rain;

        return $this;
    }

    public function getVentWindDelay(): ?string
    {
        return $this->vent_wind_delay;
    }

    public function setVentWindDelay(?string $vent_wind_delay): self
    {
        $this->vent_wind_delay = $vent_wind_delay;

        return $this;
    }

    public function getVentRainDelay(): ?string
    {
        return $this->vent_rain_delay;
    }

    public function setVentRainDelay(?string $vent_rain_delay): void
    {
        $this->vent_rain_delay = $vent_rain_delay;
    }

    public function getVentWeakWindMax(): ?string
    {
        return $this->vent_weak_wind_max;
    }

    public function setVentWeakWindMax(?string $vent_weak_wind_max): self
    {
        $this->vent_weak_wind_max = $vent_weak_wind_max;

        return $this;
    }

    public function getVentStrongWindMax(): ?string
    {
        return $this->vent_strong_wind_max;
    }

    public function setVentStrongWindMax(?string $vent_strong_wind_max): self
    {
        $this->vent_strong_wind_max = $vent_strong_wind_max;

        return $this;
    }

    public function getVentMinTemp(): ?string
    {
        return $this->vent_min_temp;
    }

    public function setVentMinTemp(?string $vent_min_temp): self
    {
        $this->vent_min_temp = $vent_min_temp;

        return $this;
    }

    public function getBlow(): ?string
    {
        return $this->blow;
    }

    public function setBlow(?string $blow): self
    {
        $this->blow = $blow;

        return $this;
    }

    public function getBlowPause(): ?string
    {
        return $this->blow_pause;
    }

    public function setBlowPause(?string $blow_pause): self
    {
        $this->blow_pause = $blow_pause;

        return $this;
    }

    public function getShadow(): ?string
    {
        return $this->shadow;
    }

    public function setShadow(?string $shadow): self
    {
        $this->shadow = $shadow;

        return $this;
    }

    public function getShadowManual(): ?string
    {
        return $this->shadow_manual;
    }

    public function setShadowManual(?string $shadow_manual): void
    {
        $this->shadow_manual = $shadow_manual;
    }


    public function getShadow1(): ?string
    {
        return $this->shadow1;
    }

    public function setShadow1(?string $shadow1): self
    {
        $this->shadow1 = $shadow1;

        return $this;
    }

    public function getShadow2(): ?string
    {
        return $this->shadow2;
    }

    public function setShadow2(?string $shadow2): self
    {
        $this->shadow2 = $shadow2;

        return $this;
    }

    public function getShadow3(): ?string
    {
        return $this->shadow3;
    }

    public function setShadow3(?string $shadow3): self
    {
        $this->shadow3 = $shadow3;

        return $this;
    }

    public function getShadow4(): ?string
    {
        return $this->shadow4;
    }

    public function setShadow4(?string $shadow4): self
    {
        $this->shadow4 = $shadow4;

        return $this;
    }

    public function getShadow5(): ?string
    {
        return $this->shadow5;
    }

    public function setShadow5(?string $shadow5): self
    {
        $this->shadow5 = $shadow5;

        return $this;
    }

    /**
     * @return Collection<int, objects>
     */
    public function getObject(): Collection
    {
        return $this->object;
    }

    public function addObject(objects $object): self
    {
        if (!$this->object->contains($object)) {
            $this->object->add($object);
            $object->setSettings($this);
        }

        return $this;
    }

    public function removeObject(objects $object): self
    {
        if ($this->object->removeElement($object)) {
            // set the owning side to null (unless already changed)
            if ($object->getSettings() === $this) {
                $object->setSettings(null);
            }
        }

        return $this;
    }
}
