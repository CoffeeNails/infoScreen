#!/bin/bash -e

CMD="$1"

function main {
    if [ "$CMD" == "on" ]; then
	echo "on 0" | cec-client -s 
    elif [ "$CMD" == "off" ]; then
	echo "standby 0" | cec-client -s
    fi
    exit 0
}

main
