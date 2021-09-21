var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ context.senderId + " AND `logged` = 1"
var exists2 = "UPDATE `users` SET `search` = '1' WHERE `users`.`Vk_ID` ="+ adduserid + "AND password != 0 AND logged != 0"
var exists3 = "UPDATE `users` SET `search` = '1' WHERE `users`.`Vk_ID` ="+ adduserid
// SELECT * FROM `users` WHERE `Vk_ID` = 656908561 AND `logged` = 0 AND `password` = 0



var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID = "+ context.senderId
conn.query(exists, (err, res)=> {
if(err) {
    console.log(err)
}
else if(res.message[15] == 1) {

    }
else if(res.message[15] == 0) {

    }
})

hearManager.hear(/^password\s(.*)$/i, async (context) => {
    const checkpass = context.$match[1];
    const password = "Ln23X4903984"+context.senderId+"343JD323JPws23"
    if(password == checkpass) {
        const code = "UPDATE `users` SET `password` = password + 1 WHERE `users`.`Vk_ID` = " + context.senderId
        conn.query(code, (err, res)=> {
        if(err) {
            console.log(err)
        }
    })    
    var a = "SELECT * FROM `users` WHERE Vk_ID = 308633849"
    conn.query(a, (err, res)=> {
    if(err) {
        console.log(err)
    }
    else if(res[0].password > 1)
    context.send({message: `Пароль уже был использован`, keyboard: check})
    else if(res[0].password == 1) {     
    context.send({message: `Пароль верный`, keyboard: ready})
    const b = "UPDATE `users` SET `logged` = 1 WHERE `users`.`Vk_ID` = " + context.senderId +" AND WHERE password = 1"
    conn.query(b, (err, res)=> {
        if(err) {
            console.log(err)
        }
    })    
}
})
}
    else if(password != checkpass)
    context.send({message: `Пароль не верный`, keyboard: check})
})



var a = "SELECT * FROM `users` WHERE Vk_ID = 308633849"
    conn.query(a, (err, res)=> {
    if(err) {
        console.log(err)
    }
    else if(res[0].logged == 1)
    context.send({message: `Вам не надо вводить пароль второй раз`, keyboard: ready})
    else if(res[0].password > 1)
    context.send({message: `Пароль уже был использован`, keyboard: check})
    else if(res[0].password == 1) {     
    context.send({message: `Пароль верный`, keyboard: ready})
    const b = "UPDATE `users` SET `logged` = 1 WHERE `users`.`Vk_ID` = " + context.senderId +" AND password = 1"
    conn.query(b, (err, res)=> {
        if(err) {
            console.log(err)
        }
    })    
}
})


var a = "SELECT * FROM `users` WHERE Vk_ID = 308633849"
conn.query(a, (err, res)=> {
if(err) {
    console.log(err)
}
else if(res[0].logged == 1)
console.log(OK)
else if(res[0].password > 1)
    context.send({message: `Пароль уже был использован`, keyboard: check})
else if(res[0].password == 1) {     
    context.send({message: `Пароль верный`, keyboard: ready})
    const b = "UPDATE `users` SET `logged` = 1 WHERE `users`.`Vk_ID` = " + context.senderId +" AND password = 1"
    conn.query(b, (err, res)=> {
        if(err) {
            console.log(err)
        }
    })  
} 
 })


  hearManager.hear(/^Check payment/i, async(context) => {
    var exists = "UPDATE `users` SET `search` = '1' WHERE logged = 1 AND Vk_ID = "+ context.senderId
    conn.query(exists, (err, res)=> {
        if(err) {
            console.log(err)
        }
        else if(res.message[15] == 1) {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Great! Now you have an access, choose your lvl again pls",
                keyboard: ready
            })
        }
        else if(res.message[15] == 0) {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Oh you have not paid yet",
                keyboard: check
            })
        }
    })
})