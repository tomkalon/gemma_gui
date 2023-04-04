<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230404180858 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE alerts (id INT AUTO_INCREMENT NOT NULL, object_id INT NOT NULL, attribute VARCHAR(255) NOT NULL, value VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, importance VARCHAR(255) NOT NULL, active VARCHAR(255) NOT NULL, INDEX IDX_F77AC06B232D562B (object_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE global_settings (id INT AUTO_INCREMENT NOT NULL, day_begin VARCHAR(255) NOT NULL, night_begin VARCHAR(255) NOT NULL, weak_wind VARCHAR(255) NOT NULL, strong_wind VARCHAR(255) NOT NULL, sun_threshold1 VARCHAR(255) NOT NULL, sun_threshold2 VARCHAR(255) NOT NULL, sun_threshold3 VARCHAR(255) NOT NULL, sun_threshold4 VARCHAR(255) NOT NULL, sun_threshold5 VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE objects (id INT AUTO_INCREMENT NOT NULL, settings_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, temp LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', humid LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', vent LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', shadow LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json)\', blow VARCHAR(255) DEFAULT NULL, heat VARCHAR(255) DEFAULT NULL, INDEX IDX_B21ACCF359949888 (settings_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE settings (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, temp_enable TINYINT(1) DEFAULT NULL, temp_day VARCHAR(255) DEFAULT NULL, temp_night VARCHAR(255) DEFAULT NULL, temp_hysteresis VARCHAR(255) DEFAULT NULL, temp_control_day TINYINT(1) DEFAULT NULL, temp_control_night TINYINT(1) DEFAULT NULL, temp_vent_close VARCHAR(255) DEFAULT NULL, temp_alarm VARCHAR(255) DEFAULT NULL, temp_alarm_flag VARCHAR(255) DEFAULT NULL, humid_enable TINYINT(1) DEFAULT NULL, humid_day VARCHAR(255) DEFAULT NULL, humid_night VARCHAR(255) DEFAULT NULL, humid_hysteresis VARCHAR(255) DEFAULT NULL, humid_control_day TINYINT(1) DEFAULT NULL, humid_control_night TINYINT(1) DEFAULT NULL, humid_vent_step VARCHAR(255) DEFAULT NULL, humid_vent_pause VARCHAR(255) DEFAULT NULL, humid_vent_pause_open VARCHAR(255) DEFAULT NULL, humid_vent_max_open VARCHAR(255) DEFAULT NULL, humid_alarm VARCHAR(255) DEFAULT NULL, humid_alarm_flag TINYINT(1) DEFAULT NULL, humid_alarm_enable TINYINT(1) DEFAULT NULL, heat_enable TINYINT(1) DEFAULT NULL, heat VARCHAR(255) DEFAULT NULL, heat_hysteresis VARCHAR(255) DEFAULT NULL, vent_enable TINYINT(1) DEFAULT NULL, vent VARCHAR(255) DEFAULT NULL, vent_step_time VARCHAR(255) DEFAULT NULL, vent_pause VARCHAR(255) DEFAULT NULL, vent_open_close_time VARCHAR(255) DEFAULT NULL, vent_max_open_rain VARCHAR(255) DEFAULT NULL, vent_wind_delay VARCHAR(255) DEFAULT NULL, vent_rain_delay VARCHAR(255) DEFAULT NULL, vent_weak_wind_max VARCHAR(255) DEFAULT NULL, vent_strong_wind_max VARCHAR(255) DEFAULT NULL, vent_min_temp VARCHAR(255) DEFAULT NULL, blow_enable TINYINT(1) DEFAULT NULL, blow VARCHAR(255) DEFAULT NULL, blow_pause VARCHAR(255) DEFAULT NULL, shadow_enable TINYINT(1) DEFAULT NULL, shadow VARCHAR(255) DEFAULT NULL, shadow_manual VARCHAR(255) DEFAULT NULL, shadow1 VARCHAR(255) DEFAULT NULL, shadow2 VARCHAR(255) DEFAULT NULL, shadow3 VARCHAR(255) DEFAULT NULL, shadow4 VARCHAR(255) DEFAULT NULL, shadow5 VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE stats (id INT AUTO_INCREMENT NOT NULL, object_id INT NOT NULL, temp VARCHAR(255) DEFAULT NULL, humid VARCHAR(255) DEFAULT NULL, vent VARCHAR(255) DEFAULT NULL, shadow VARCHAR(255) DEFAULT NULL, blow VARCHAR(255) DEFAULT NULL, heat VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, INDEX IDX_574767AA232D562B (object_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE weather (id INT AUTO_INCREMENT NOT NULL, temp VARCHAR(255) DEFAULT NULL, humid VARCHAR(255) DEFAULT NULL, sun VARCHAR(255) DEFAULT NULL, rain VARCHAR(255) DEFAULT NULL, wind VARCHAR(255) DEFAULT NULL, wind_direction VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE weather_stats (id INT AUTO_INCREMENT NOT NULL, temp VARCHAR(255) DEFAULT NULL, humid VARCHAR(255) DEFAULT NULL, sun VARCHAR(255) DEFAULT NULL, rain VARCHAR(255) DEFAULT NULL, wind VARCHAR(255) DEFAULT NULL, created DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE alerts ADD CONSTRAINT FK_F77AC06B232D562B FOREIGN KEY (object_id) REFERENCES objects (id)');
        $this->addSql('ALTER TABLE objects ADD CONSTRAINT FK_B21ACCF359949888 FOREIGN KEY (settings_id) REFERENCES settings (id)');
        $this->addSql('ALTER TABLE stats ADD CONSTRAINT FK_574767AA232D562B FOREIGN KEY (object_id) REFERENCES objects (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE alerts DROP FOREIGN KEY FK_F77AC06B232D562B');
        $this->addSql('ALTER TABLE objects DROP FOREIGN KEY FK_B21ACCF359949888');
        $this->addSql('ALTER TABLE stats DROP FOREIGN KEY FK_574767AA232D562B');
        $this->addSql('DROP TABLE alerts');
        $this->addSql('DROP TABLE global_settings');
        $this->addSql('DROP TABLE objects');
        $this->addSql('DROP TABLE settings');
        $this->addSql('DROP TABLE stats');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE weather');
        $this->addSql('DROP TABLE weather_stats');
    }
}
