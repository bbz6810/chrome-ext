#!/bin/sh
env=$1 #test\prod

if  [ ! -n "$env" ] ;then
    echo "--- 请输入打包环境参数：test、prod"
    exit 0
fi
if test $env != "test" -a $env != "prod" ;then
    echo "--- 打包环境错误，可选环境：test、prod"
    exit 0
fi

echo "--- $env 环境打包 begin"

echo "--- 清理上次build目录"
rm -rf build package

echo "--- 创建build目录"
mkdir package

echo "--- copy src to build"
cp -a src build

if [ ! -f "src/js/config/$env.js" ];
then
  echo "--- 环境配置文件不存在：src/js/config/$env.js"
  exit 0
fi

cat src/js/config/$env.js src/js/config/index.js > build/js/config/index.js
echo "--- 合并env config 完成"
 
version=`sh tool/json.sh < build/manifest.json | egrep '\["version"\]' | awk -F'"' '{print$4}'`
 
if test $env == "prod";then
  newVersion=`git symbolic-ref --short -q HEAD|grep -oE '\d+\.\d+\.\d+'`
  echo version:$version newVersion:$newVersion
  sed -i '' "/version/s/$version/$newVersion/g" build/manifest.json || exit 0 
  version=$newVersion
fi
 
sh tool/crxmake.sh build spider-ext.pem

mv build.crx package
cp -a build/* package


commitId=`git rev-parse --short HEAD`

if test $env == "test";then
  zip -r update-v$version-$commitId.zip package
else
  zip -r update-latest.zip package
fi
 
echo "--- $env 环境打包 success"
