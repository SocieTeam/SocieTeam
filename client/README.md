If you can't start the react app, do the following:
1. If you get an error that looks like `Cannot find module 'D:\xx\xx\xx/config-overrides'`  
[Reference](https://github.com/timarney/react-app-rewired/issues/156)
2. Copy that path that it spits out. Notice theres a forward slash before `config-overrides`
3. Go into `node_modules`
4. Go into `react-app-rewired`
5. Go into `config-overrides.js`
6. Add this line on line 2:  
`paths.configOverrides = 'rest_of_your_path_goes_here\\config-overrides'`
7. Save, and try running it. Should work.
