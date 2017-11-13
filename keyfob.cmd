@echo OFF

echo *************** KeyFob Provisioning **********************

if "x%JAVA_HOME%" == "x" (
  echo JAVA_HOME is not set.
  echo Set JAVA_HOME to the directory of your local JDK to avoid this message.
  goto END
)

if "x%KEYCLOAK_HOME%" == "x" (
  echo KEYCLOAK_HOME is not set.
  echo Set KEYCLOAK_HOME to the directory of your local keycloak installation.
  goto END
)

if "x%KEYCLOAK_PORT%" == "x" (
  set "KEYCLOAK_PORT=8080"
  echo KEYCLOAK_PORT is not set. Default port is 8080
) else (
  set "KEYCLOAK_PORT=%KEYCLOAK_PORT%"
  echo KEYCLOAK_PORT is %KEYCLOAK_PORT%
)

if "x%KEYFOB_PORT%" == "x" (
  set "KEYFOB_PORT=3000"
  echo KEYFOB_PORT is not set. Default port is 3000
) else (
  set "KEYFOB_PORT=%KEYFOB_PORT%"
  echo KEYFOB_PORT is %KEYFOB_PORT%
)

if exist "%KEYCLOAK_HOME%\bin\kcadm.bat" (
    set "PATH=%PATH%;%KEYCLOAK_HOME%\bin;"
) else (
  echo Could not locate "kcadm.bat"
  echo Please check the Keycloak installation.
  goto END
)

set /p _adminUserName="Admin username : "
set /p _adminPwd="Admin password : "
set KEYFOB_REALM=master
set KEYFOB_URL=http://localhost:%KEYFOB_PORT%
set KEYCLOAK_URL=http://localhost:%KEYCLOAK_PORT%/auth
call kcadm config credentials --server %KEYCLOAK_URL% --realm %KEYFOB_REALM% --user %_adminUserName% --password %_adminPwd%
call kcadm create clients -r %KEYFOB_REALM% -s clientId=keyfob-ui -s publicClient=true -s "redirectUris=[\"%KEYFOB_URL%\"]"

GOTO addUserForKeyFob

:LOOP
echo.
set /p choice="Do you want to create more user (y/n) ? "

IF "%choice%"=="y" goto addUserForKeyFob
IF "%choice%"=="Y" goto addUserForKeyFob
IF "%choice%"=="n" goto END
IF "%choice%"=="N" goto END

:addUserForKeyFob
echo.
set DUPLICATE_USER=User exists with same username
set /p _userName="UserName : "
call kcadm create users -s username=%_userName% -s enabled=true -r %KEYFOB_REALM% > keyfob.result 2>&1
set /p createUserResult=<keyfob.result
echo %createUserResult%
IF /I "%createUserResult%"=="%DUPLICATE_USER%" (
  GOTO LOOP
)
echo Adding create-realm role...
call kcadm add-roles -r %KEYFOB_REALM% --uusername %_userName% --rolename create-realm
echo Setting up a temporary password...
call kcadm set-password -r %KEYFOB_REALM% --username %_userName% --new-password password --temporary
GOTO LOOP

:END
EXIT /b