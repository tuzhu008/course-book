# heroku
1、注册、安装本地脚手架
2、新建项目
3、将项目添加到本地git
```bash
git init 
git add .
git add .gitignore
git commit -m "ver1.0"
```
4、创建heroku app
```bash
heroku create #这一步会自动将远端的地址加入到git的配置文件中
git push heroku master
```