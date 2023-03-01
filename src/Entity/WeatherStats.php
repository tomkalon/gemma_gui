<?php

namespace App\Entity;

use App\Repository\WeatherStatsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: WeatherStatsRepository::class)]
class WeatherStats
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sun = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $rain = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $wind = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTemp(): ?string
    {
        return $this->temp;
    }

    public function setTemp(?string $temp): self
    {
        $this->temp = $temp;

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

    public function getSun(): ?string
    {
        return $this->sun;
    }

    public function setSun(?string $sun): self
    {
        $this->sun = $sun;

        return $this;
    }

    public function getRain(): ?string
    {
        return $this->rain;
    }

    public function setRain(?string $rain): self
    {
        $this->rain = $rain;

        return $this;
    }

    public function getWind(): ?string
    {
        return $this->wind;
    }

    public function setWind(?string $wind): self
    {
        $this->wind = $wind;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): void
    {
        $this->created = $created;
    }

}
