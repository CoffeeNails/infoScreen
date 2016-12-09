#/bin/sh

#iceweasel info2.aaltoes.com --private-window --display=:0 &
sudo rm -r ~/.cache/mozilla/firefox/*.default/*
iceweasel localhost --display=:0 &
sleep 10;
xte  "key F11" -x:0
