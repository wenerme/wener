#!/usr/bin/env bash

# This is not works
prepare(){
if ! is_connected; then
    echo "Connect you device first"
    return false
fi

if [ ! -f tap ];then
    echo Please generate tap event first
    exit 1
fi

echo Generate shell script

cat <<SCRIPT > tap.sh
TAP=$(<tap)
while true; do
    cat $$TAP > /dev/input/event1
    sleep 0.03
done
SCRIPT

chmod +x tap.sh

echo Push to device
adb shell 'mkdir -p /sdcard/temp/dir && cd $_'
adb push tap /sdcard/temp/dir/
adb push tap.sh /sdcard/temp/dir/

return
}
can_upgrade(){
    screencap upgrade
    # srgb(190,69,35)
    convert upgrade.png -format '%[pixel:p{1017,1308}]' info:- | grep 69 > /dev/null
    return $?
}

can_challenge() {
    screencap challenge
    #srgb(240,110,64)
    convert challenge.png -format '%[pixel:p{840,140}]' info:- | grep 110 > /dev/null
    return $?
}

has_dialog(){
    screencap dialog
    # 38,38,38
    convert dialog.png -format '%[pixel:p{949,432}]' info:- | grep grey15 > /dev/null
    return $?
}

watch_dialog(){
sleep 15
while true
do
    echo Watching dialog
    if has_dialog
    then
        echo "Do close dialog"
        adb shell input tap 949 432
    fi
    sleep 150
done
}

watch_upgrade(){
sleep 5
while true
do
    echo Watching upgrade
    if can_upgrade
    then
        echo "Do upgrade"
        for i in `seq 1 10`;
        do
            adb shell input tap 1017 1308
            sleep 1
        done
    fi
    sleep 60
done
}

watch_challenge(){
while true
do
    echo Watching challenge
    if can_challenge
    then
        echo "Do challenge"
        adb shell input tap 840 140

        # Skills
        adb shell input tap 1000 1100

        adb shell input tap 90 1700
        adb shell input tap 270 1700
        adb shell input tap 450 1700
        adb shell input tap 630 1700
        adb shell input tap 810 1700
        adb shell input tap 990 1700

        adb shell input tap 130 1870
    fi
    sleep 240
done
}

watch_tap(){
echo Watching tap
while true
do
    adb shell "while true;do cat /mnt/sdcard/events > /dev/input/event1 && sleep 0.03; done;"
    wait_device
done
}

wait_device(){
while true
do
    is_connected && break
    echo Wating device.
    sleep 5
done
}

is_connected(){
    [ $(adb devices | wc -l ) -gt 2 ]
    return $?
}

screencap(){
    wait_device > /dev/null
    adb shell screencap /sdcard/screen.png
    adb pull /sdcard/screen.png ${1:-screen}.png 2>/dev/null
    echo Cap ${1:-screen}
}

main(){
rm *.png
watch_tap &
watch_upgrade &
watch_challenge &
watch_dialog &

for job in `jobs -p`
do
    wait ${job}
done
}

use_tcp(){
local DEV_IP=$(adb shell ip -f inet addr show wlan0 |tail -1| sed 's|.*inet\s\([0-9.]\+\).*|\1|g')
adb tcpip 5555
adb disconnect
adb connect ${DEV_IP}:5555
}

use_usb(){
adb usb
}

disconnect(){
adb disconnect
}

ACTION=${1:-main}
${ACTION//-/_}
