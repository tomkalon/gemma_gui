<?php

namespace App\Entity;

use App\Repository\AlertsRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlertsRepository::class)]
class Alerts
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $attribute = null;

    #[ORM\Column(length: 255)]
    private ?string $value = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\ManyToOne(targetEntity: Objects::class, inversedBy: 'alerts')]
    #[ORM\JoinColumn(nullable: false)]
    private ?objects $object = null;

    #[ORM\Column]
    private ?bool $isRead = null;

    #[ORM\Column]
    private ?bool $isActive = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAttribute(): ?string
    {
        return $this->attribute;
    }

    public function setAttribute(string $attribute): self
    {
        $this->attribute = $attribute;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
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

    public function isIsRead(): ?bool
    {
        return $this->isRead;
    }

    public function setIsRead(bool $isRead): self
    {
        $this->isRead = $isRead;

        return $this;
    }

    public function isIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

}
