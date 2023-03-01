<?php

namespace App\Entity;

use App\Repository\ObjectsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ObjectsRepository::class)]
class Objects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $temp2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $humid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $vent = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $shadow = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $blow = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $heat = null;

    #[ORM\OneToOne(targetEntity: Settings::class)]
    #[ORM\JoinColumn(name: 'settings_id', referencedColumnName: 'id')]
    private ?int $settings_id;

    #[ORM\OneToMany(mappedBy: 'object', targetEntity: Stats::class)]
    private ?Collection $stats;

    #[ORM\OneToMany(mappedBy: 'object', targetEntity: Alerts::class)]
    private ?Collection $alerts;

    public function  __construct()
    {
        $this->stats = new ArrayCollection();
        $this->alerts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getTemp1(): ?string
    {
        return $this->temp;
    }

    public function setTemp1(?string $temp1): self
    {
        $this->temp = $temp1;

        return $this;
    }

    public function getTemp2(): ?string
    {
        return $this->temp2;
    }

    public function setTemp2(?string $temp2): self
    {
        $this->temp2 = $temp2;

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

    public function getVent(): ?string
    {
        return $this->vent;
    }

    public function setVent(?string $vent): self
    {
        $this->vent = $vent;

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

    public function getBlow(): ?string
    {
        return $this->blow;
    }

    public function setBlow(?string $blow): self
    {
        $this->blow = $blow;

        return $this;
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

    public function getTemp(): ?string
    {
        return $this->temp;
    }

    public function setTemp(?string $temp): self
    {
        $this->temp = $temp;

        return $this;
    }

    public function getSettingsId(): ?int
    {
        return $this->settings_id;
    }

    public function setSettingsId(?int $settings_id): void
    {
        $this->settings_id = $settings_id;
    }

    public function getStats(): ?Collection
    {
        return $this->stats;
    }

    public function setStats(?Collection $stats): void
    {
        $this->stats = $stats;
    }

    public function getAlerts(): ?Collection
    {
        return $this->alerts;
    }

    public function setAlerts(?Collection $alerts): void
    {
        $this->alerts = $alerts;
    }

}
