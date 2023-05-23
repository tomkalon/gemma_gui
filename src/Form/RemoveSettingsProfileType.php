<?php

namespace App\Form;

use App\Entity\Settings;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RemoveSettingsProfileType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('temp_enable')
            ->add('temp_day')
            ->add('temp_night')
            ->add('temp_hysteresis')
            ->add('temp_control_day')
            ->add('temp_control_night')
            ->add('temp_vent_close')
            ->add('temp_alarm')
            ->add('temp_alarm_flag')
            ->add('humid_enable')
            ->add('humid_day')
            ->add('humid_night')
            ->add('humid_hysteresis')
            ->add('humid_control_day')
            ->add('humid_control_night')
            ->add('humid_vent_step')
            ->add('humid_vent_pause')
            ->add('humid_vent_pause_open')
            ->add('humid_vent_max_open')
            ->add('humid_alarm')
            ->add('humid_alarm_flag')
            ->add('humid_alarm_enable')
            ->add('heat_enable')
            ->add('heat')
            ->add('heat_hysteresis')
            ->add('vent_enable')
            ->add('vent')
            ->add('vent_step_time')
            ->add('vent_pause')
            ->add('vent_open_close_time')
            ->add('vent_max_open_rain')
            ->add('vent_wind_delay')
            ->add('vent_rain_delay')
            ->add('vent_weak_wind_max')
            ->add('vent_strong_wind_max')
            ->add('vent_min_temp')
            ->add('blow_enable')
            ->add('blow')
            ->add('blow_pause')
            ->add('shadow_enable')
            ->add('shadow')
            ->add('shadow_manual')
            ->add('shadow1')
            ->add('shadow2')
            ->add('shadow3')
            ->add('shadow4')
            ->add('shadow5')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Settings::class,
        ]);
    }
}
