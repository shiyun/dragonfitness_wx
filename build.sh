#!/bin/sh

filename='dragonfitness-'
version='1.0.0'
day=`date +%Y%m%d%H`

MY_BUILD_NUMBER=`echo 0000$BUILD_NUMBER |sed 's/.*\([0-9]\{4\}\)$/\1/'`

filename=$filename$version'-'$day'-'$MY_BUILD_NUMBER



echo 'file name:'$filename
tar czvf  build/$filename.tgz  build.sh run.sh  package.json  app.js  config.alpha.js config.release.js  bin/  node_modules/  public/  routes/  util/  views/
