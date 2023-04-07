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
    private ?array $temp = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?array $humid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?array $vent = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?array $shadow = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $blow = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $heat = null;

    #[ORM\Column(length: 1023, nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'object', targetEntity: Stats::class, orphanRemoval: true)]
    private Collection $stats;

    #[ORM\ManyToOne(inversedBy: 'object')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Settings $settings = null;

    #[ORM\OneToMany(mappedBy: 'object', targetEntity: Alerts::class, orphanRemoval: true)]
    private Collection $alerts;

    public function __construct()
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

    public function getTemp(): ?array
    {
        return $this->temp;
    }

    public function setTemp(?array $temp): self
    {
        $this->temp = $temp;

        return $this;
    }

    public function getHumid(): ?array
    {
        return $this->humid;
    }

    public function setHumid(?array $humid): self
    {
        $this->humid = $humid;

        return $this;
    }

    public function getVent(): ?array
    {
        return $this->vent;
    }

    public function setVent(?array $vent): self
    {
        $this->vent = $vent;

        return $this;
    }

    public function getShadow(): ?array
    {
        return $this->shadow;
    }

    public function setShadow(?array $shadow): self
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return Collection<int, Stats>
     */
    public function getStats(): Collection
    {
        return $this->stats;
    }

    public function addStat(Stats $stat): self
    {
        if (!$this->stats->contains($stat)) {
            $this->stats->add($stat);
            $stat->setObject($this);
        }

        return $this;
    }

    public function removeStat(Stats $stat): self
    {
        if ($this->stats->removeElement($stat)) {
            // set the owning side to null (unless already changed)
            if ($stat->getObject() === $this) {
                $stat->setObject(null);
            }
        }

        return $this;
    }

    public function getSettings(): ?Settings
    {
        return $this->settings;
    }

    public function setSettings(?Settings $settings): self
    {
        $this->settings = $settings;

        return $this;
    }

    /**
     * @return Collection<int, Alerts>
     */
    public function getAlerts(): Collection
    {
        return $this->alerts;
    }

    public function addAlert(Alerts $alert): self
    {
        if (!$this->alerts->contains($alert)) {
            $this->alerts->add($alert);
            $alert->setObject($this);
        }

        return $this;
    }

    public function removeAlert(Alerts $alert): self
    {
        if ($this->alerts->removeElement($alert)) {
            // set the owning side to null (unless already changed)
            if ($alert->getObject() === $this) {
                $alert->setObject(null);
            }
        }

        return $this;
    }

}
