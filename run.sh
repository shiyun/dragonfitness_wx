#!/bin/sh

if [ "release" == ${1} ];then
	export configPath='config.release.js'
else
	export configPath='config.alpha.js'
fi
pm2 stop dragonfitness
pm2 start bin/dragonfitness