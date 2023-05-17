<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230517163349 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE alerts (id INT AUTO_INCREMENT NOT NULL, object_id INT NOT NULL, attribute VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, is_read TINYINT(1) NOT NULL, is_active TINYINT(1) NOT NULL, date DATETIME NOT NULL, INDEX IDX_F77AC06B232D562B (object_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE global_settings (id INT AUTO_INCREMENT NOT NULL, day_begin VARCHAR(255) NOT NULL, night_begin VARCHAR(255) NOT NULL, weak_wind VARCHAR(255) NOT NULL, strong_wind VARCHAR(255) NOT NULL, sun_threshold1 VARCHAR(255) NOT NULL, sun_threshold2 VARCHAR(255) NOT NULL, sun_threshold3 VARCHAR(255) NOT NULL, sun_threshold4 VARCHAR(255) NOT NULL, sun_threshold5 VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stats (id INT AUTO_INCREMENT NOT NULL, object_id INT NOT NULL, temp VARCHAR(255) DEFAULT NULL, humid VARCHAR(255) DEFAULT NULL, vent VARCHAR(255) DEFAULT NULL, shadow VARCHAR(255) DEFAULT NULL, blow VARCHAR(255) DEFAULT NULL, heat VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, INDEX IDX_574767AA232D562B (object_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE weather (id INT AUTO_INCREMENT NOT NULL, temp VARCHAR(255) DEFAULT NULL, humid VARCHAR(255) DEFAULT NULL, sun VARCHAR(255) DEFAULT NULL, rain VARCHAR(255) DEFAULT NULL, wind VARCHAR(255) DEFAULT NULL, wind_direction VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE weather_stats (id INT AUTO_INCREMENT NOT NULL, temp VARCHAR(255) DEFAULT NULL, humid VARCHAR(255) DEFAULT NULL, sun VARCHAR(255) DEFAULT NULL, rain VARCHAR(255) DEFAULT NULL, wind VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE alerts ADD CONSTRAINT FK_F77AC06B232D562B FOREIGN KEY (object_id) REFERENCES objects (id)');
        $this->addSql('ALTER TABLE stats ADD CONSTRAINT FK_574767AA232D562B FOREIGN KEY (object_id) REFERENCES objects (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE alerts DROP FOREIGN KEY FK_F77AC06B232D562B');
        $this->addSql('ALTER TABLE stats DROP FOREIGN KEY FK_574767AA232D562B');
        $this->addSql('DROP TABLE alerts');
        $this->addSql('DROP TABLE global_settings');
        $this->addSql('DROP TABLE stats');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE weather');
        $this->addSql('DROP TABLE weather_stats');
    }
}
