/etc/passwd – Contains one line for each user account.
/etc/shadow – Contains the password information in encrypted formatfor the system’s accounts and optional account aging information.
/etc/group – Defines the groups on the system.
/etc/default/useradd – This file contains a value for the default group, if none is specified by the useradd command.
/etc/login.defs – This file defines the site-specific configuration for the shadow password suite stored in /etc/shadow file


useradd Example – Add a new user to secondary group

You need to the useradd command to add new users to existing group (or create a new group and then add user). If group does not exist, create it. The syntax is as follows:
useradd -G {group-name} username

If you do not see any output then you need to add group developers using the groupadd command:
# groupadd developers

Next, add a user called vivek to group developers:
# useradd -G developers vivek

Setup password for user vivek:
# passwd vivek

Ensure that user added properly to group developers:
# id vivek

# useradd -G admins,ftp,www,developers jerry

useradd example – Add a new user to primary group

To add a user tony to group developers use the following command:
# useradd -g developers tony
# id tony

usermod example – Add a existing user to existing group

Add existing user tony to ftp supplementary/secondary group with the usermod command using the -a option ~ i.e. add the user to the supplemental group(s). Use only with -G option:
# usermod -a -G ftp tony

In this example, change tony user’s primary group to www, enter:
# usermod -g www tony

usermod command options summary
Option	Purpose
-a
--append	Add the user to the supplementary group(s). Use only with the -G option.
-g GROUP
--gid GROUP	Use this GROUP as the default group.
-G GRP1,GRP2
--groups GRP1,GRP2	Add the user to GRP1,GRP2 secondary group.
A note about security

If you add or delete user to existing group, you must change the owner of any crontab files or at jobs manually. You must make any changes involving NIS on the NIS server too.

A note about GUI tool

You will probably find the use of the GUI tool easy. KDE user can use KUser tool and the GNOME user can use users-admin tool called system-config-users:
# system-config-users

system-config-users
