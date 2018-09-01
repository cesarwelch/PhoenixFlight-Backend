to run use: 
npm run start:dev 
and
SET PGSSLMODE=require

SET DATABASE_URL=postgres://pzwhqkpvuhcwxc:54e598d5ccdc5885b5489272633e92f18e62d72345b4caa5f37c7c8a8da76da3@ec2-50-16-231-2.compute-1.amazonaws.com:5432/d57tlrevd498lk
 
pg_ctl -D postgres start

to stop DB use 
pg_ctl -D postgres stop

also 
pg_ctl -D postgres status         is a thing.




Creating todo Items******************"# PhoenixFlight-Backend" 
