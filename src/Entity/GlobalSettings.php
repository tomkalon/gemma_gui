<?php

namespace App\Entity;

use App\Repository\GlobalSettingsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GlobalSettingsRepository::class)]
class GlobalSettings
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $day_begin = null;

    #[ORM\Column(length: 255)]
    private ?string $night_begin = null;

    #[ORM\Column(length: 255)]
    private ?string $weak_wind = null;

    #[ORM\Column(length: 255)]
    private ?string $strong_wind = null;

    #[ORM\Column(length: 255)]
    private ?string $sun_threshold1 = null;

    #[ORM\Column(length: 255)]
    private ?string $sun_threshold2 = null;

    #[ORM\Column(length: 255)]
    private ?string $sun_threshold3 = null;

    #[ORM\Column(length: 255)]
    private ?string $sun_threshold4 = null;

    #[ORM\Column(length: 255)]
    private ?string $sun_threshold5 = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayBegin(): ?string
    {
        return $this->day_begin;
    }

    public function setDayBegin(string $day_begin): self
    {
        $this->day_begin = $day_begin;

        return $this;
    }

    public function getNightBegin(): ?string
    {
        return $this->night_begin;
    }

    public function setNightBegin(string $night_begin): self
    {
        $this->night_begin = $night_begin;

        return $this;
    }

    public function getWeakWind(): ?string
    {
        return $this->weak_wind;
    }

    public function setWeakWind(string $weak_wind): self
    {
        $this->weak_wind = $weak_wind;

        return $this;
    }

    public function getStrongWind(): ?string
    {
        return $this->strong_wind;
    }

    public function setStrongWind(string $strong_wind): self
    {
        $this->strong_wind = $strong_wind;

        return $this;
    }

    public function getSunThreshold1(): ?string
    {
        return $this->sun_threshold1;
    }

    public function setSunThreshold1(string $sun_threshold1): self
    {
        $this->sun_threshold1 = $sun_threshold1;

        return $this;
    }

    public function getSunThreshold2(): ?string
    {
        return $this->sun_threshold2;
    }

    public function setSunThreshold2(?string $sun_threshold2): void
    {
        $this->sun_threshold2 = $sun_threshold2;
    }

    public function getSunThreshold3(): ?string
    {
        return $this->sun_threshold3;
    }

    public function setSunThreshold3(string $sun_threshold3): self
    {
        $this->sun_threshold3 = $sun_threshold3;

        return $this;
    }

    public function getSunThreshold4(): ?string
    {
        return $this->sun_threshold4;
    }

    public function setSunThreshold4(string $sun_threshold4): self
    {
        $this->sun_threshold4 = $sun_threshold4;

        return $this;
    }

    public function getSunThreshold5(): ?string
    {
        return $this->sun_threshold5;
    }

    public function setSunThreshold5(?string $sun_threshold5): void
    {
        $this->sun_threshold5 = $sun_threshold5;
    }
}
