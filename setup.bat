@echo off
echo Setja upp Húsakortasjá...

REM Fara í admin_app og setja upp vefir
cd admin_app
npm install

REM Fara aftur í rótina og setja upp vefir
cd ..
npm install

REM Fara í open_map og setja upp vefir
cd open_map
npm install

echo Uppsetning lokið!
pause
