<?php

namespace App\Entity;

use App\Repository\StatsRepository;
use DateTimeInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StatsRepository::class)]
class Stats
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

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

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?DateTimeInterface $created = null;

    #[ORM\ManyToOne(inversedBy: 'stats')]
    #[ORM\JoinColumn(nullable: false)]
    private ?objects $object = null;

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

    public function setBlow(?string $blow): void
    {
        $this->blow = $blow;
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

    public function getCreated(): ?DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?DateTimeInterface $created): void
    {
        $this->created = $created;
    }

    public function getObject(): ?objects
    {
        return $this->object;
    }

    public function setObject(?objects $object): self
    {
        $this->object = $object;

        return $this;
    }
}
