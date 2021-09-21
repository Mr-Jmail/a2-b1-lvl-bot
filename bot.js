const { VK, Keyboard, MessageContext, Context, VKAppPayloadContext, resolveResource, API } = require('vk-io')
const vk = new VK({ token: "69e2f9da3ea01fd5bc01bc24b8a0d1be4c1c376ec7d04da3fe9ab9c7beb03245842cec8722b260d121117" })
const { HearManager } = require('@vk-io/hear')
const hearManager = new HearManager('<MessageContext>')
vk.updates.on('message_new', hearManager.middleware)
const mysql = require('mysql')
const vk1 = new VK({ token: "b46c3c5753e5a56e159eee128cceebbebd37e243fb4c65a9d16d455e3d2358799cb8529b4d3ed35bb27f0" })
//const conn = mysql.createPool({host: "localhost", user: "root", password: "Gamel09022006@", database: "a2-b1 bot", connectionLimit: 10})
const conn = mysql.createPool({host: "yvu4xahse0smimsc.chr7pe7iynqr.eu-west-1.rds.amazonaws.com", user: "vla3izoz9mxjuqzm", password: "gd1nf39vue2rgdky", database: "tfzp8pdl0ab3p1r8", connectionLimit: 7})
const api = new API({
	token: "69e2f9da3ea01fd5bc01bc24b8a0d1be4c1c376ec7d04da3fe9ab9c7beb03245842cec8722b260d121117"
});

hearManager.hear(/^Начать|Привет|hello|хай|start|старт/i, async(context) => {
     var exists = "UPDATE `users` SET `search` = '1' WHERE `users`.`Vk_ID` ="+ context.senderId
     conn.query(exists, (err, res) => {
    if(err) {
        console.log(err)
    }
    else if(res.message[15] == 1) {
        vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "Hello, I’m your A2-B1 lvl Cambridge assistant\nNow choose your lvl!!",
        attachment: "photo-205320016_457239022",
        keyboard: ready
    })
  }
    else if(res.message[15] == 0) {
        vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "Hello, I’m your A2-B1 lvl Cambridge assistant\nNow choose your lvl!",
        attachment: "photo-205320016_457239022",
        keyboard: ready
    })

var code = "INSERT INTO `users` (`ID`, `Vk_ID`, `logged`, `password`, `search`) VALUES (NULL, "+ context.senderId + ", '0', '0', NULL);"
conn.query(code, (err, res)=> {
if(err) {
      console.log(err)
}
})
}
})

})

hearManager.hear(/^password\s(.*)$/i, async (context) => {
    const checkpass = context.$match[1];
    const password = "Ln23X4903984"+context.senderId+"343JD323JPws23"
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID = "+ context.senderId
conn.query(exists, (err, res)=> {
if(err) {
    console.log(err)
}
else if(res.message[15] == 1) {
if(password == checkpass) {
        const code = "UPDATE `users` SET `password` = password + 1 WHERE `users`.`Vk_ID` = " + context.senderId
        conn.query(code, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
    })    
    var a = "SELECT * FROM `users` WHERE Vk_ID = " +context.senderId
    conn.query(a, (err, res)=> {
    if(err) {
        console.log(err)
    }
    else if(res[0].logged == 1 && res[0].password > 1){
    context.send({message: `Вам не надо вводить пароль второй раз`})
    context.send({message: `Выберите ваш уровень`, keyboard: ready})    
}       
    else if(res[0].password > 1)
    context.send({message: `Пароль уже был использован`, keyboard: check})
    else if(res[0].password == 1) {     
    context.send({message: `Пароль верный`})
    context.send({message: `Выберите ваш уровень`, keyboard: ready})
    const b = "UPDATE `users` SET `logged` = 1 WHERE `users`.`Vk_ID` = " + context.senderId +" AND password = 1"
    conn.query(b, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
    })    
}
})
}
    else if(password != checkpass)
    context.send({message: `Пароль не верный`, keyboard: check})
    }
else if(res.message[15] == 0) {

var code = "INSERT INTO `users` (`ID`, `Vk_ID`, `logged`, `password`, `search`) VALUES (NULL, "+ context.senderId + ", '0', '0', NULL);"
conn.query(code, (err, res)=> {
if(err) {
    console.log(err)
  }
})


if(password == checkpass) {
        const code = "UPDATE `users` SET `password` = password + 1 WHERE `users`.`Vk_ID` = " + context.senderId
        conn.query(code, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
    })    
    var a = "SELECT * FROM `users` WHERE Vk_ID = " + context.senderId
    conn.query(a, (err, res)=> {
    if(err) {
        console.log(err)
    }
    else if(res[0].logged == 1 && res[0].password > 1) {
    context.send({message: `Вам не надо вводить пароль второй раз`})
    context.send({message: `Выберите ваш уровень`, keyboard: ready})    
}    
    else if(res[0].password > 1)
    context.send({message: `Пароль уже был использован`, keyboard: check})
    else if(res[0].password == 1) {     
    context.send({message: `Пароль верный`})
    context.send({message: `Выберите ваш уровень`, keyboard: ready})
    const b = "UPDATE `users` SET `logged` = 1 WHERE `users`.`Vk_ID` = " + context.senderId +" AND password = 1"
    conn.query(b, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
    })    
}
})
}
    else if(password != checkpass)
    context.send({message: `Пароль не верный`, keyboard: check})
    }
})
})



hearManager.hear(/^add user\s(.*)$/i, async (context) => {
    const resource = await resolveResource({
        api,
        resource: context.$match[1]
    });
    const adduserid = resource.id
    if(context.senderId == 308633849 || context.senderId == 267710524) {
    var code = "UPDATE `users` SET `logged` = '1', `password` = '1' WHERE `users`.`Vk_ID` = "+ adduserid
    var code2 = "INSERT INTO `users` (`ID`, `Vk_ID`, `logged`, `password`, `search`) VALUES (NULL, "+ adduserid + ", '1', '1', NULL);"
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ adduserid + " AND `logged` = 0 AND `password` = 0"
    var exists2 = "UPDATE `users` SET `search` = '1' WHERE `users`.`Vk_ID` ="+ adduserid + " AND `users`.`password` != '0' AND `users`.`logged` != '0'"
    var exists3 = "UPDATE `users` SET `search` = '1' WHERE `users`.`Vk_ID` ="+ adduserid

    conn.query(exists, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
        else if(res.message[15] == 1) {
            conn.query(code, (err, res)=> {
                if(err) {
                    console.log(err)
                }           
          })  
            context.send({message: `Пользователь ${adduserid} добавлен`})
            vk1.api.messages.send({
                peer_id: adduserid,
                random_id: 0,
                message: "Здравствуйте! Я - системный администратор группы @club205448446 (A2-B1 Cambridge Bot)\nВы оплатили доступ к закрытому A2-B1 Cambridge Bot\nТеперь он доступен вам по ссылке ниже, можете переходить и начинать пользоваться\nhttps://vk.com/im?sel=-205448446 ",
            })
        }
        else if(res.message[15] == 0) {
            conn.query(exists2, (err, res)=> {
                if(err) {
                    console.log(err)
                }
        else if(res.message[15] == 1) {
            context.send(`Пользователь ${adduserid} уже был добавлен ранее`)
        }
        else if(res.message[15] == 0) {
            conn.query(code2, (err, res)=> {
                if(err) {
                    console.log(err)
                }   
        }) 
            context.send({message: `Пользователь ${adduserid} добавлен`})
            vk1.api.messages.send({
                peer_id: adduserid,
                random_id: 0,
                message: "Здравствуйте! Я - системный администратор группы @club205448446 (A2-B1 Cambridge Bot)\nВы оплатили доступ к закрытому A2-B1 Cambridge Bot\nТеперь он доступен вам по ссылке ниже, можете переходить и начинать пользоваться\nhttps://vk.com/im?sel=-205448446 ",
            })
      }
    })
  }
})
}
    else if(context.senderId != 308633849 || context.senderId != 267710524)
    context.send({message: `У вас нет доступа к этой команде`})

})


hearManager.hear(/^s add user\s(.*)$/i, async (context) => {
    const resource = await resolveResource({
        api,
        resource: context.$match[1]
    });
    const adduserid = resource.id
    if(context.senderId == 308633849 || context.senderId == 267710524) {
    var code = "UPDATE `users` SET `logged` = '1', `password` = '1' WHERE `users`.`Vk_ID` = "+ adduserid
    var code2 = "INSERT INTO `users` (`ID`, `Vk_ID`, `logged`, `password`, `search`) VALUES (NULL, "+ adduserid + ", '1', '1', NULL);"
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ adduserid + " AND `logged` = 0 AND `password` = 0"
    var exists2 = "UPDATE `users` SET `search` = '1' WHERE `users`.`Vk_ID` ="+ adduserid + " AND `users`.`password` != '0' AND `users`.`logged` != '0'"

    conn.query(exists, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
        else if(res.message[15] == 1) {
            conn.query(code, (err, res)=> {
                if(err) {
                    console.log(err)
                }           
          })  
            context.send({message: `Пользователь ${adduserid} добавлен`})
        }
        else if(res.message[15] == 0) {
            conn.query(exists2, (err, res)=> {
                if(err) {
                    console.log(err)
                }
        else if(res.message[15] == 1) {
            context.send(`Пользователь ${adduserid} уже был добавлен ранее`)
        }
        else if(res.message[15] == 0) {
            conn.query(code2, (err, res)=> {
                if(err) {
                    console.log(err)
                }   
        }) 
            context.send({message: `Пользователь ${adduserid} добавлен`})
      }
    })
  }
})
}
    else if(context.senderId != 308633849 || context.senderId != 267710524)
    context.send({message: `У вас нет доступа к этой команде`})

})


hearManager.hear(/^delete user\s(.*)$/i, async (context) => {
    const resource = await resolveResource({
        api,
        resource: context.$match[1]
    });
    const deleteuserid = resource.id
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ deleteuserid + " AND `logged` = 0 AND `password` = 0"
    if(context.senderId == 308633849 || context.senderId == 267710524) {
        conn.query(exists, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
        else if(res.message[15] == 1) {
    context.send({message: `Пользователь ${deleteuserid} уже был удалён ранее или никогда не имел доступа`})
        }
        else if(res.message[15] == 0) {
    var code = "UPDATE `users` SET `logged` = '0', `password` = '0' WHERE `users`.`Vk_ID` = "+ deleteuserid
    conn.query(code, (err, res)=> {
        if(err) {
                console.log(err)
        }
      })
    context.send({message: `Пользователь ${deleteuserid} удален`})
    vk1.api.messages.send({
        peer_id: deleteuserid,
        random_id: 0,
        message: "Здравствуйте! Я - системный администратор группы @club205448446 (A2-B1 Cambridge Bot)\nВы потеряли доступ к закрытому A2-B1 Cambridge Bot\nТеперь он не доступен вам\nЕсли вы не согласны с причиной снятия доступа, или не знаете её, то напишите свой вопрос в этот диалог",
    })
    }
  })
}
    else if(context.senderId != 308633849 || context.senderId != 267710524)
    context.send({message: `У вас нет доступа к этой команде`})
})


hearManager.hear(/^s delete user\s(.*)$/i, async (context) => {
    const resource = await resolveResource({
        api,
        resource: context.$match[1]
    });
    const deleteuserid = resource.id
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ deleteuserid + " AND `logged` = 0 AND `password` = 0"
    if(context.senderId == 308633849 || context.senderId == 267710524) {
        conn.query(exists, (err, res)=> {
        if(err) {
            console.log(err)
            context.send(`${err}`)
        }
        else if(res.message[15] == 1) {
    context.send({message: `Пользователь ${deleteuserid} уже был удалён ранее или никогда не имел доступа`})
        }
        else if(res.message[15] == 0) {
    var code = "UPDATE `users` SET `logged` = '0', `password` = '0' WHERE `users`.`Vk_ID` = "+ deleteuserid
    conn.query(code, (err, res)=> {
        if(err) {
                console.log(err)
        }
      })
    context.send({message: `Пользователь ${deleteuserid} удален`})
    }
  })
}
    else if(context.senderId != 308633849 || context.senderId != 267710524)
    context.send({message: `У вас нет доступа к этой команде`})
})


const ready = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `A2`,
            color: "positive",
            payload: "A2"
        }),
        Keyboard.textButton({
            label: `B1`,
            color: "negative",
            payload: "B1"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Author`,
            url: "https://vk.com/cambridgeteacher"
        })
    ]
])
.oneTime()

hearManager.hear(/^A2/i, async(context) => {
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ context.senderId + " AND `logged` = 1"
        conn.query(exists, (err, res)=> {
            if(err) {
                console.log(err)
            }
            else if(res.message[15] == 1) {
                vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Ok, now choose what you want to learn",
                keyboard: vidgetA2
                })
            }
            else if(res.message[15] == 0) {
                context.send({message: `Oh, you dont have an access`, keyboard:check })
            }
        })
})


const check = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Get an access`,
            url: "https://vk.com/app5898182_-148989815#s=1358257"
        }),
        Keyboard.textButton({
            label: `Check payment`,
            color: "positive"
        }),
        Keyboard.urlButton({
            label: `Technical support`,
            url: "https://vk.com/mr.jmail"
        })
    ]
])
.inline()

    
hearManager.hear(/^Check payment/i, async(context) => {
    var exists = "UPDATE `users` SET `search` = '1' WHERE logged = 1 AND Vk_ID = "+ context.senderId
    conn.query(exists, (err, res)=> {
        if(err) {
            console.log(err)
        }
        else if(res.message[15] == 1) {
            vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Great! Now you have an access, choose your lvl again pls",
                keyboard: ready
            })
        }
        else if(res.message[15] == 0) {
            vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Oh you have not paid yet",
                keyboard: check
            })
        }
    })
})

const vidgetA2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Phrasal Verbs`,
            color: "primary",
            payload: "A2"
        }),
        Keyboard.textButton({
            label: `Prepositional Phrases`,
            color: "positive",
            payload: "A2"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Author`,
            url: "https://vk.com/cambridgeteacher"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",
            payload: "choise"
        })
    ]
])
.oneTime()

hearManager.hear(/^B1/i, async(context) => {
    var exists = "UPDATE `users` SET `search` = '1' WHERE Vk_ID ="+ context.senderId + " AND `logged` = 1"
        conn.query(exists, (err, res)=> {
            if(err) {
                console.log(err)
            }
            else if(res.message[15] == 1) {
                vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Ok, now choose what you want to learn",
                keyboard: vidgetA2
                })
            }
            else if(res.message[15] == 0) {
                context.send({message: `Oh, you dont have an access`, keyboard:check })
            }
        })
})


const vidgetB1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Phrasal Verbs`,
            color: "primary",
            payload: "B1"
        }),    
        Keyboard.textButton({
            label: `Prepositional Phrases`,
            color: "positive",
            payload: "B1"
        })
    ],[
        Keyboard.urlButton({
            label: `Author`,
            url: "https://vk.com/cambridgeteacher"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",
            payload: "choise"
        })
    ]
])

    hearManager.hear(/Phrasal Verbs/i, async(context) => {
        if(context.messagePayload == "A2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "What part would you like to start with?",
                keyboard: partspva2
            })
        }
        else if(context.messagePayload == "B1") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "What part would you like to start with?",
                keyboard: partspvb1
            })
        }
    })

    const partspva2 = Keyboard.keyboard([
        [
            Keyboard.textButton({
                label: `Part 1`,
                payload: "part 1 phrasel verbs a2"
            }),
            Keyboard.textButton({
                label: `Part 2`,
                payload: "part 2 phrasel verbs a2"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 3`,
                payload: "part 3 phrasel verbs a2"
            }),
            Keyboard.textButton({
                label: `Part 4`,
                payload: "part 4 phrasel verbs a2"
            })
        ],
        [
                Keyboard.textButton({
                    label: `Back`,
                    color: "negative",
                    payload: "A2"
                })
        ]
    ])


    const partspvb1 = Keyboard.keyboard([
        [
            Keyboard.textButton({
                label: `Part 1`,
                payload: "part 1 phrasel verbs b1"
            }),
            Keyboard.textButton({
                label: `Part 2`,
                payload: "part 2 phrasel verbs b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 3`,
                payload: "part 3 phrasel verbs b1"
            }),
            Keyboard.textButton({
                label: `Part 4`,
                payload: "part 4 phrasel verbs b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 5`,
                payload: "part 5 phrasel verbs b1"
            }),
            Keyboard.textButton({
                label: `Part 6`,
                payload: "part 6 phrasel verbs b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 7`,
                payload: "part 7 phrasel verbs b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Back`,
                color: "negative",
                payload: "B1"
            })
        ]
    ])

    hearManager.hear(/Prepositional Phrases/i, async(context) => {
        if(context.messagePayload == "A2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "What part would you like to start with?",
                keyboard: partsppa2
            })
        }
        else if(context.messagePayload == "B1") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "What part would you like to start with?",
                keyboard: partsppb1
            })
        }
    })

    const partsppb1 = Keyboard.keyboard([
        [
            Keyboard.textButton({
                label: `Part 1`,
                payload: "part 1 prepositional phrases b1"
            }),
            Keyboard.textButton({
                label: `Part 2`,
                payload: "part 2 prepositional phrases b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 3`,
                payload: "part 3 prepositional phrases b1"
            }),
            Keyboard.textButton({
                label: `Part 4`,
                payload: "part 4 prepositional phrases b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 5`,
                payload: "part 5 prepositional phrases b1"
            }),
            Keyboard.textButton({
                label: `Part 6`,
                payload: "part 6 prepositional phrases b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 7`,
                payload: "part 7 prepositional phrases b1"
            })
        ],
        [
            Keyboard.textButton({
                label: `Back`,
                color: "negative",
                payload: "B1"
            })
        ]

    ])


    const partsppa2 = Keyboard.keyboard([
        [
            Keyboard.textButton({
                label: `Part 1`,
                payload: "part 1 prepositional phrases a2"
            }),
            Keyboard.textButton({
                label: `Part 2`,
                payload: "part 2 prepositional phrases a2"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 3`,
                payload: "part 3 prepositional phrases a2"
            }),
            Keyboard.textButton({
                label: `Part 4`,
                payload: "part 4 prepositional phrases a2"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 5`,
                payload: "part 5 prepositional phrases a2"
            }),
            Keyboard.textButton({
                label: `Part 6`,
                payload: "part 6 prepositional phrases a2"
            })
        ],
        [
            Keyboard.textButton({
                label: `Part 7`,
                payload: "part 7 prepositional phrases a2"
            }),
            Keyboard.textButton({
                label: `Part 8`,
                payload: "part 8 prepositional phrases a2"
            })
        ],
        [
            Keyboard.textButton ({
                label: `Back`,
                color: "negative",
                payload: "A2"
            })
        ]
    ])

    hearManager.hear(/^Part 1/i, async(context) => {
        if(context.messagePayload == "part 1 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part1pva2
            
            })
        }
        else if(context.messagePayload == "part 1 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part1ppa2
            })
        }
        else if(context.messagePayload == "part 1 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part1pvb1
            })
        }
        else if(context.messagePayload == "part 1 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part1ppb1
            })
        }
    })

    hearManager.hear(/^Part 2/i, async(context) => {
        if(context.messagePayload == "part 2 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part2pva2
            
            })
        }
        else if(context.messagePayload == "part 2 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part2ppa2
            })
        }
        else if(context.messagePayload == "part 2 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part2pvb1
            })
        }
        else if(context.messagePayload == "part 2 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part2ppb1
            })
        }
    })


    hearManager.hear(/^Part 3/i, async(context) => {
        if(context.messagePayload == "part 3 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part3pva2
            
            })
        }
        else if(context.messagePayload == "part 3 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part3ppa2
            })
        }
        else if(context.messagePayload == "part 3 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part3pvb1
            })
        }
        else if(context.messagePayload == "part 3 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part3ppb1
            })
        }
    })

    hearManager.hear(/^Part 4/i, async(context) => {
        if(context.messagePayload == "part 4 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part4pva2
            
            })
        }
        else if(context.messagePayload == "part 4 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part4ppa2
            })
        }
        else if(context.messagePayload == "part 4 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part4pvb1
            })
        }
        else if(context.messagePayload == "part 4 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part4ppb1
            })
        }
    })

    hearManager.hear(/^Part 5/i, async(context) => {
        if(context.messagePayload == "part 5 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part5pva2
            
            })
        }
        else if(context.messagePayload == "part 5 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part5ppa2
            })
        }
        else if(context.messagePayload == "part 5 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part5pvb1
            })
        }
        else if(context.messagePayload == "part 5 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part5ppb1
            })
        }
    })

    hearManager.hear(/^Part 6/i, async(context) => {
        if(context.messagePayload == "part 6 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part6pva2
            
            })
        }
        else if(context.messagePayload == "part 6 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part6ppa2
            })
        }
        else if(context.messagePayload == "part 6 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part6pvb1
            })
        }
        else if(context.messagePayload == "part 6 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part6ppb1
            })
        }
    })

    hearManager.hear(/^Part 7/i, async(context) => {
        if(context.messagePayload == "part 7 phrasel verbs a2") {
            await vk.api.messages.send({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part7pva2
            
            })
        }
        else if(context.messagePayload == "part 7 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part7ppa2
            })
        }
        else if(context.messagePayload == "part 7 phrasel verbs b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part7pvb1
            })
        }
        else if(context.messagePayload == "part 7 prepositional phrases b1") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part7ppb1
            })
        }
    })

    hearManager.hear(/^Part 8/i, async(context) => {
        if(context.messagePayload == "part 8 prepositional phrases a2") {
            await vk.api.messages.send ({
                peer_id: context.peerId,
                random_id: 0,
                message: "Now you can click on any word and see it in the dictionary",
                keyboard: part8ppa2
            })
        }
    })


//Part 1 phrasel verbs B1 lvl
const part1pvb1 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Find out`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/find-out/"
        }),
        Keyboard.urlButton({
            label: `Get together`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/get-together"
        }),
        Keyboard.textButton({
            label: `Blow away`
        })
    ],
    [
        Keyboard.urlButton({
            label: `Meet up with`,
            url: "https://dictionary.cambridge.org/ru/словарь/английский/meet-up-with-someone?q=meet+up+with"
        }),
        Keyboard.urlButton({
            label: `Switch on/off`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/switch-sth-on?q=switch+on"
        }),
        Keyboard.urlButton({
            label: `Burn down`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/burn-sth-down"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Save up`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9/save-sth-up?q=Save+sth+up"
        }),
        Keyboard.textButton({
            label: `Turn up, down, on, off, over`,
            color: "secondary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604340962/b1-phrasal-verbs-part-1-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])

hearManager.hear(/^Turn up, down, on, off, over/i, async(context) => {
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "You can click on Phrasal Verbs and go to cambridge dictionary",
            keyboard: turnup
        })
    })

    hearManager.hear(/^Blow away/i, async(context) => {
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            attachment: "photo-205320016_457239034"
        })
    })


    hearManager.hear(/^Other parts/i, async(context) => {
        if(context.messagePayload == "B1 phrasel verbs")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partspvb1
        })
        else if(context.messagePayload == "A2 phrasel verbs")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partspva2
        })
        else if(context.messagePayload == "B1 prepositional phrases")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partsppb1
        })
        else if(context.messagePayload == "A2 prepositional phrases")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partsppa2
        })
    })



const turnup = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Turn up`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/turn-up_1#turn_pvg_35"
        }),
        Keyboard.urlButton({
            label: `Turn down`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/turn-down#turn_pvg_7"
        }),
        Keyboard.urlButton({
            label: `Turn smth on`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/turn-on_1#turn_pvg_19"
        }),
        Keyboard.urlButton({
            label: `Turn off`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/turn-off_1#turn_pvg_17"
        }),
        Keyboard.urlButton({
            label: `Turn over`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/turn-sth-over?q=Turn+over"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",
            payload: "pvb1part1"
        })
    ]
])


const part2pvb1 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Come out`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/come-out"
        }),
        Keyboard.urlButton({
            label: `Stay in`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/stay-in"
        }),
        Keyboard.urlButton({
            label: `Take off`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/take-off-2/"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Put out`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/put-sth-out?q=Put+out"
        }),
        Keyboard.urlButton({
            label: `Go out`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/go-out"
        }),
        Keyboard.urlButton({
            label: `Give a lift`,
            url: "https://idioms.thefreedictionary.com/give+a+lift"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Split up`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/split-up"
        }),
        Keyboard.urlButton({
            label: `Come over`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/come-over"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604341990/b1-phrasal-verbs-part-2-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])


const part3pvb1 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Break up`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/break-up"
        }),
        Keyboard.textButton({
            label: `Tidy up`
        }),
        Keyboard.urlButton({
            label: `Show around`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/show-around"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Go away`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/go-away"
        }),
        Keyboard.urlButton({
            label: `Eat out`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/eat-out"
        }),
        Keyboard.urlButton({
            label: `Give away`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/give-away#give_pvg_2"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Catch up with smb`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/catch-up"
        }),
        Keyboard.urlButton({
            label: `Look smt up`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/look-up-1/"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604342888/b1-phrasal-verbs-part-3-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])


const part4pvb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Sort out`
        }),
        Keyboard.urlButton({
            label: `End up`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/end-up"
        }),
        Keyboard.urlButton({
            label: `Turn into`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/turn-into"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Set off = Set out`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/set-off"
        }),
        Keyboard.urlButton({
            label: `Move in/out`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/move-out"
        }),
        Keyboard.urlButton({
            label: `Hang out`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/hang-out"
        }),
        Keyboard.textButton({
            label: `Run out of ~time~`
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604343819/b1-phrasal-verbs-part-4-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])

hearManager.hear( /^Run out of ~time~$/i, async (context) => {
    await context.send({message: `To have no more time to do smth`});
})

hearManager.hear( /^Sort out$/i, async (context) => {
    await context.send({message: `Сортировать`});
})

const part5pvb1 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Take up`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/take-sth-up"
        }),
        Keyboard.urlButton({
            label: `Bring up`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/bring-sb-up?q=bring+up"
        }),
        Keyboard.urlButton({
            label: `Go for`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/go-for-sth"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Set up`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/set-sth-up"
        }),
        Keyboard.urlButton({
            label: `Put off`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/put-sth-off"
        }),
        Keyboard.urlButton({
            label: `Keep on = Carry on`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/carry-on"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Get back`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/get-back"
        }),
        Keyboard.urlButton({
            label: `Hang on`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/hang-on"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604344468/b1-phrasal-verbs-part-5-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])



const part6pvb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Get to know`
        }),
        Keyboard.urlButton({
            label: `Fall out`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/fall-out"
        }),
        Keyboard.urlButton({
            label: `Give in = Hand in`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/hand-sth-in?q=Hand+in"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Clear up`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/clear-up"
        }),
        Keyboard.urlButton({
            label: `Get on(well with smb)`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/get-on"
        }),
        Keyboard.urlButton({
            label: `Fall down`,
            url: "https://dictionary.cambridge.org/ru/словарь/английский/fall-down?q=Fall+down"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Do well/Do badly`,
            url: "https://www.ldoceonline.com/dictionary/do-well"
        }),
        Keyboard.urlButton({
            label: `Do your best`,
            url: "https://dictionary.cambridge.org/dictionary/english/do-your-very-best"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604346106/b1-phrasal-verbs-part-6-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])


hearManager.hear(/Get to know/i, async(context) => {
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            attachment: "photo-205320016_457239035"
    })
})

const part7pvb1 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Deal with`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/deal-with-sth"
        }),
        Keyboard.urlButton({
            label: `Get into`,
            url: "https://dictionary.cambridge.org/ru/%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/%D0%B0%D0%BD%D0%B3%D0%BB%D0%BE-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/get-into-sth"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Join in`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/join-in-sth?q=Join+in"
        }),
        Keyboard.urlButton({
            label: `Pop out`,
            url: "https://www.thefreedictionary.com/pop+out"
        }),
        Keyboard.urlButton({
            label: `Stay away from`,
            url: "https://dictionary.cambridge.org/dictionary/english/stay-away-from-sb-sth"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Work out`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/work-out"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604346643/b1-phrasal-verbs-part-7-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 phrasel verbs" 
        })
    ]
])


//Part 1 prepositional phrases B1 lvl
const part1ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Have a go at`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Pay attention to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `To be keen on`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `On your own`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `By yourself`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Keep in touch`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Depend on`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At the same time`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-1?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Have a go at/i, async(context) => {
    context.send({message: `Have a go at – try something new
Here are some examples:
1)	I ‘ve always wanted to have a go at football.
2)	I thought I would have a go at rugby this year.
3)	Why don't you just have a go at skiing?
`})
})

hearManager.hear(/^Pay attention to/i, async(context) => {
    context.send({message: `Pay attention to – обратить внимание на
1) Pay attention to your manners.
2) Please pay attention to what I am saying.
3) Pay attention to the road signs.
    `})
})

hearManager.hear(/^To be keen on/i, async(context) => {
    context.send({message: ` To be keen on – like
1) Mrs. Miller is very keen on art.
2) I'm really keen on Chinese paintings.
3)  I got quite keen on the idea.
`})
})

hearManager.hear(/^On your own/i, async(context) => {
    context.send({message: `On your own – сам(а), synonym of “by yourself”
1)	I would strongly advise against going out on your own late at night.
2)	Can you do it on your own?
3)	It's no fun eating on your own.
    `})
})

hearManager.hear(/^By yourself/i, async(context) => {
    context.send({message: `By yourself - сам(а), synonym of “on your on”
1)	You can go there by yourself.
2)	You should make your bed by yourself.
3)	You can't go home by yourself in the dark.
    `})
})

hearManager.hear(/^Keep in touch/i, async(context) => {
    context.send({message: `Keep in touch – быть на связи
1) I keep in touch with my parents by emails.
2) Let's keep in touch with each other.
3) They hugged and promised to keep in touch.
    `})
})

hearManager.hear(/^Depend on/i, async(context) => {
    context.send({message: `Depend on – зависеть от
1)	You can't depend on your parents forever.
2)	Whether we’ll go to the beach or not depends on the weather.
3)	Happiness doesn't depend on any external conditions. It depends on you.
    `})
})

hearManager.hear(/^At the same time/i, async(context) => {
    context.send({message: `At the same time – в то же самое время
1) Meet me at the same time tomorrow.
2) She woke every morning at the same time.
3) Don’t speak all of you at the same time. Let’s do it one by one.
    `})
})



const part2ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `As well as`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Аs soon as`,
            payload: "ppb1",
            color: "primary"
        }),
        Keyboard.textButton({
            label: `As far as`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Аccording to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Look forward to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Instead of`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Wait for`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Similar to`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-2?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^As well as/i, async(context) => {
    context.send({message: `As well as – также как
1)	A good teacher should teach as well as learn.
2)	She shares my troubles as well as my joys.
3)	The tournament is open for amateurs as well as for professionals.
    `})
})

hearManager.hear(/^Аs soon as/i, async(context) => {
    if (context.messagePayload == "ppb1")
    context.send({message: `As soon as – как можно скорее, как только
1)	Write me as soon as possible.
2)	The dogs ran off as soon as we appeared.
3)	I'll do it as soon as I can
    `})
})

hearManager.hear(/^As far as/i, async(context) => {
    context.send({message: `As far as – насколько
1)	As far as I know, he is not that rich.
2)	As far as I am informed, nobody has done anything.
3)	As far as I can remember, he’s got a green car.
    `})
})

hearManager.hear(/^Аccording to/i, async(context) => {
    context.send({message: `According to – согласно (чему-то)
1)	Everything is going according to schedule.
2)	The students were regrouped according to height and weight.
3)	According to John you were in Edinburgh last week.
    `})
})

hearManager.hear(/^Look forward to/i, async(context) => {
    context.send({message: `Look forward to – wait and want something very much
1)	We look forward to hearing from you soon.
2)	I always look forward to getting home to my wife and children.
3)	I’m looking forward to meeting you.
    `})
})

hearManager.hear(/^Instead of/i, async(context) => {
    context.send({message: `Instead of – вместо 	
1)	He used a spoon instead of a fork.
2)	Will you go to the party instead of me?
3)	You probably picked up my keys instead of yours.
    `})
})

hearManager.hear(/^Wait for/i, async(context) => {
    if(context.messagePayload == "A2")
    context.send({message: `ждать (чего-то, кого-то)\nHEre are some examples:\n1) What are you doing here? - I'm waiting for my friends.\n2) Don't go! Wait for me!\n3) While we were waiting for the lesson to start, we chatted and laughed 😅.`})
    else
    context.send({message: `Wait for – ждать
1)  Weak men wait for opportunity, but the strong men make it
2)	Could you wait for me, please?
3)	You must wait for five more days.
    `}) 
    
})

hearManager.hear(/^Similar to/i, async(context) => {
    context.send({message: `Similar to – похож на
1)	Your opinion is similar to mine.
2)	The findings are similar to those reported in previous studies.
3)	My new dress is similar to the one you have.
    `})
})

const part3ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Different from`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Fаmous for`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Ashamed of`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Be tired of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Complain of = about`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Surprised at`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Interested in`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Good or bad at`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-3?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Different from/i, async(context) => {
    context.send({message: `Different from – отличается от
1)	American English is significantly different from British English.
2)	Our sons are very different from each other.
3)	My opinion is different from yours.
    `})
})

hearManager.hear(/^Fаmous for/i, async(context) => {
    context.send({message: `Famous for – известен (чем)
1)	This town is famous for its beautiful buildings.
2)	That school is famous for baseball.
3)	London was once famous for its fogs.
    `})
})

hearManager.hear(/^Ashamed of/i, async(context) => {
    context.send({message: `Ashamed of – стыдно за 
1)	You've got nothing to be ashamed of.
2)	She was ashamed of her children's behaviour.
3)	I am ashamed of you.
    `})
})

hearManager.hear(/^Be tired of/i, async(context) => {
    context.send({message: `Be tired of
1)	I am tired of this continual rain.
2)	I am tired of waiting.
3)	I'm tired of your constant complaints; go away and leave me in peace!
    `})
})

hearManager.hear(/^Complain of = about/i, async(context) => {
    context.send({message: `Complain of – жаловаться на
1)	Patients with high blood pressure may complain of pain in the neck or the back of the head.
2)	Students should complain of all this amount of homework.
3)	He died so unexpectedly, he’d never complained of any illness!
    `})
})

hearManager.hear(/^Surprised at/i, async(context) => {
    context.send({message: `Surprised at – удивиться (чему-то)
1)	I was very much surprised at the news.
2)	We were pleasantly surprised at the profit we made.
3)	I was surprised at how quickly she agreed.
    `})
})

hearManager.hear(/^Interested in/i, async(context) => {
    context.send({message: `Interested in – интересоваться (чем-то)
1)	He's very interested in nuclear physics.
2)	My hobby is chess. Are you interested in learning?
3)	He wasn't interested in growing flowers in the garden.
    `})
})

hearManager.hear(/^Good or bad at/i, async(context) => {
    context.send({message: `Good or bad at – быть хорошим или плохим в чем-то
1)	John is good at French but bad at history.
2)	I've never been very good at drawing.
3)	She is bad at telling anecdotes.
    `})
})

const part4ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Responsible for`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `In advance`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On purpose`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Rely on`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Have things in common with`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Ask for advice`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `In order to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Suffer from`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-4?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Responsible for/i, async(context) => {
    context.send({message: `Responsible for – отвечать за
1)	He is directly responsible for this.
2)	The insurance company is responsible for this case.
3)	All pilots are responsible for their passengers' safety.
    `})
})

hearManager.hear(/^In advance/i, async(context) => {
    context.send({message: `In advance – заранее	
1)	You must pay for the ticket in advance.
2)	Customers are advised to make seat reservations well in advance.
3)	I should warn you in advance that I'm not a very good dancer.
    `})
})

hearManager.hear(/^On purpose/i, async(context) => {
    context.send({message: `On purpose – специально (не нечаянно)
1)	I didn't do it on purpose - it was an accident.
2)	I came here on purpose to see you.
3)	I don't think he stepped on your toes on purpose.
    `})
})

hearManager.hear(/^Rely on/i, async(context) => {
    context.send({message: `Rely on – положиться на
1)	You may rely on me.
2)	We must rely on ourselves.
3)	The owner of a car is no longer forced to rely on public transport.
    `})
})

hearManager.hear(/^Have things in common with/i, async(context) => {
    context.send({message: `Have (thing)s in common – иметь общее
1)	We should be focusing on what we have in common rather than emphasizing our differences.
2)	What all these tropical forests have in common, however, is their astonishing biological diversity.
3)	We have a lot of things in common with my best friend.
    `})
})

hearManager.hear(/^Ask for advice/i, async(context) => {
    context.send({message: `Ask for advice – спросить совет
1)	Go to your doctor and ask for advice.
2)	Don'tbe afraid to ask your parents for advice.
3)	He's the last person I would ask for advice.
    `})
})

hearManager.hear(/^In order to/i, async(context) => {
    context.send({message: `In order to – для того чтобы
1) I meditate in order to relax.
2) Understand yourself in order to better understanding others.
3) He walked about in order to keep warm.
  `})
})

hearManager.hear(/^Suffer from/i, async(context) => {
    context.send({message: `Suffer from – страдать от
1)	Do you suffer from migraine?
2)	A lot of students suffer from exam nerves.
3)	About 70% of women suffer from stress.
    `})
})

const part5ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Bеlong to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Out of order`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On foot`,
            payload: "A2",
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `On sale`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Familiar with`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At leаst`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Because of`,
            payload: "ppb1",
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At first`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-5?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Bеlong to/i, async(context) => {
    context.send({message: `Belong to – принадлежать (кому-то, чему-то)
1)	Who does this belong to?
2)	Does this house belong to Mr. Winter?
3)	That doesn't belong to you.
    `})
})

hearManager.hear(/^Out of order/i, async(context) => {
    context.send({message: `Out of order – не работает, сломалось (about machines)
1)	The office telephones were all out of order.
2)	The laser jet printer is out of order, so I can’t print anything.
3)	Our tractor is out of order.
    `})
})

hearManager.hear(/^On foot/i, async(context) => {
    if(context.messagePayload == "A2")
    context.send({message: `On foot – пешком	
1)	Nowadays people like going on foot.
2)	We came on foot.
3)	We decided to go on foot.
    `})
    else 
    context.send({message: `пешком\nHere are some examples:
1) -How do you get to school 🏫? 
-On foot
2) I go to school on foot.
3) They won't take a bus, they'll walk on foot.`})
})

hearManager.hear(/^On sale/i, async(context) => {
    context.send({message: `On sale – на (рас)продаже
1)	Tickets are on sale from the booking office.
2)	There are some nice apples on sale in that shop.
3)	These gloves were on sale for only $9.
    `})
})

hearManager.hear(/^Familiar with/i, async(context) => {
    context.send({message: `Familiar with – знать 
1)	Are you familiar with this type of machine?
2)	In order to succeed in your exam you have to be familiar with its format.
3)	Are you familiar with the rules of baseball?
    `})
})

hearManager.hear(/^Because of/i, async(context) => {
    if(context.messagePayload == "ppb1")
    context.send({message: `Because of – из-за
1)	All flights have been cancelled because of fog.
2)	Several children are away from school because of illness.
3)	We can't go out because of the rain.
    `})
    else 
    context.send({message: `ИЗ-ЗА\nHere are some examples:
1) I don't want to go there because of you.
2) I was late because of the traffic.
3) Because of you we're late again`})
})

hearManager.hear(/^At first/i, async(context) => {
    context.send({message: `At first – сначала
1) If at first you don't succeed, try, try again.
2) At first, he was really scared.
3) No one believed me at first.
4) At first I was like mmm... English as a joke, but bro I don't think it's a joke anymore
    `})
})

hearManager.hear(/^At leаst/i, async(context) => {
    context.send({message: `At least – минимум, хотя бы
1)	At least ten people were killed in the crash.
2)	You should read one book a month at least.
3)	Marinate the chicken for at least 4 hours.    
    `})
})

const part6ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `At its best`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `In particular`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Deal with`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Believe in`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At once`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At risk`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-6?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^At its best/i, async(context) => {
    context.send({message: `At its best – в наилучшем виде
1)	Nature is at its best in spring.
2)	The garden is at its best in June.
3)	His food exemplifies Italian cooking at its best.
    `})
})

hearManager.hear(/^In particular/i, async(context) => {
    context.send({message: `In particular – особенно	
1)	There is nothing in particular about him.
2)	Why did you choose that day in particular?
3)	Who in particular would you like to talk to?
    `})
})

hearManager.hear(/^Believe in/i, async(context) => {
    context.send({message: `Believe in – верить в
1)	You have to believe in yourself. That's the secret of success.
2)	Do you believe in ghosts?
3)	I said I don't believe in Santa Claus.
    `})
})

hearManager.hear(/^At once/i, async(context) => {
    context.send({message: `At once – сразу, одновременно
1)	No man can do two things at once.
2)	The receptionist recognized him at once.
3)	Everyone began talking at once.
    `})
})

hearManager.hear(/^At risk/i, async(context) => {
    context.send({message: `At risk – рискованно	
1)	That would mean putting other children at risk .
2)	The whole future of the company is at risk.
3)	He was putting himself at risk.
    `})
})

hearManager.hear(/^Deal with/i, async(context) => {
    context.send({message: `Deal with – иметь дело с, решать проблемы с
1)	She’s used to dealing with foreigners. 
2)	He is difficult to deal with.
3)	Do you know how to deal with this problem?
    `})
})

const part7ppb1 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Attach to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Arrange in`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Surrounted by`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `In fact`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `In general`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At present`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/b1-prepositional-phrases-part-7?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "B1 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Attach to/i, async(context) => {
    context.send({message: `Attach to – прикрепить к
1)	Don’t forget to attach a recent photograph to your application form.
2)	Don't forget to attach the label to your luggage.
3)	Use this cable to attach the printer to the computer.
    `})
})

hearManager.hear(/^Arrange in/i, async(context) => {
    context.send({message: `Arrange in – распределить по	
1)	In Stonehenge the stones are arranged in a circle.
2)	The teacher arranged students in mini-groups for the project.
    `})
})

hearManager.hear(/^Surrounted by/i, async(context) => {
    context.send({message: `Surrounded by – окружен (чем)
1)	The house was surrounded by a forest.
2)	The President arrived surrounded by his body guards.
3)	As a child I was surrounded by love and kindness.
    `})
})

hearManager.hear(/^In fact/i, async(context) => {
    context.send({message: `In fact – на самом деле
1)	He looked so strange, but in fact, he’s a teacher.
2)	His jokes seemed spontaneous, but were in fact carefully prepared beforehand.
3)	She seemed rather miserable when in fact she was just shy.
    `})
})

hearManager.hear(/^In general/i, async(context) => {
    context.send({message: `In general – в общем
1)	I like games in general, and especially football.
2)	In general, men are taller than women.
3)	People in general like her.
    `})
})

hearManager.hear(/^At present/i, async(context) => {
    context.send({message: `At present – в настоящее время
1)	Nothing about my life excites me at present.
2)	I can't use my office at present; it is under repair.
3)	Are you taking any other drugs at present?
    `})
})

//Part 1 phrasel verbs A2 lvl
const part1pva2 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Look after`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/look-after-sth?q=look+after"
        }),
        Keyboard.urlButton({
            label: `Wash up`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/washing-up?q=Washing+up+"
        }),
        Keyboard.urlButton({
            label: `Look for`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/look-for/"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Look forward to`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/look-forward-to-sth?q=Look+forward+to+"
        }),
        Keyboard.urlButton({
            label: `Show around`,
            url: "https://dictionary.cambridge.org/dictionary/english/show-sb-around-sth?q=Show+around+"
        }),
        Keyboard.textButton({
            label: `Pick up`
        })
    ],
    [
        Keyboard.urlButton({
            label: `Find out`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/find-out/"
        }),
        Keyboard.urlButton({
            label: `Come along`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/come-along-1/"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604336199/a2-phrasal-verbs-part-1-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 phrasel verbs" 
        })
    ]
])

hearManager.hear(/^Pick up/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        attachment: "photo-205320016_457239029"
    })
})

    hearManager.hear(/^Other parts/i, async(context) => {
        if(context.messagePayload == "A2 phrasel verbs")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partspva2
        })
        else if(context.messagePayload == "A2 phrasel verbs")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partspva2
        })
        else if(context.messagePayload == "A2 prepositional phrases")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partsppb1
        })
        else if(context.messagePayload == "A2 prepositional phrases")
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are all parts",
            keyboard: partsppa2
        })
    })



const part2pva2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Switch on, off or turn on, off`
        }),
        Keyboard.textButton({
            label: `Turn up or down`
        }),
        Keyboard.urlButton({
            label: `Take smth off`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/take-off-2/"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Put smth away`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/put-away#put_pvg_7"
        }),
        Keyboard.textButton({
            label: `It takes me… to…`
        }),
        Keyboard.urlButton({
            label: `Hurry up`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/hurry-up?q=Hurry+up"
        })
    ],
    [
        Keyboard.textButton({
            label: `Take part in`
        }),
        Keyboard.textButton({
            label: `To be on ~TV~`
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604337113/a2-phrasal-verbs-part-2-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 phrasel verbs" 
        })
    ]
])


hearManager.hear(/^Switch on, off or turn on, off/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "Choose which phrasal verb you will expolre",
        keyboard: switchon
    })
})

hearManager.hear(/^Take part in/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        attachment: "photo-205320016_457239030"
    })
})

hearManager.hear(/^To be on ~TV~/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "To be on TV - (показывать, быть) по телевизору:\nWhat's on TV today? Что сегодня (показывают) по телевизору?"
    })
})

const switchon = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Switch on = Turn on`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/switch-sth-on?q=switch+on"
        }),
        Keyboard.urlButton({
            label: `Switch smth off = Turn off`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/switch-sth-off?q=switch+%28sth%29+off"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",

            payload: "part2pva2"
        })
    ]
])

hearManager.hear(/^Turn up or down/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "Choose which phrasal verb you will expolre",
        keyboard: turnupor
    })
})

const turnupor = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Turn smth up`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/turn-up_1#turn_pvg_35"
        }),
        Keyboard.urlButton({
            label: `Turn smth down`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/turn-down#turn_pvg_7"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",
            payload: "part2pva2"
        })
    ]
])


hearManager.hear(/^It takes me… to…/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "An amount of time you need to do smth\nFor example: It takes me 4 hours to do my hw"
    })
})


const part3pva2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Run business`
        }),
        Keyboard.textButton({
            label: `Can't wait to`
        }),
        Keyboard.textButton({
            label: `Fill smth in`
        })
    ],
    [
        Keyboard.textButton({
            label: `Tidy up`,
        }),
        Keyboard.textButton({
            label: `Go out or stay in`
        }),
        Keyboard.urlButton({
            label: `Get back`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/get-back?q=Get+back+"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Come around(to)`,
            url: "https://www.oxfordlearnersdictionaries.com/definition/english/come-around#comeround_pvg_2"
        }),
        Keyboard.urlButton({
            label: `Get on with`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/get-on-with-1/"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604338342/a2-phrasal-verbs-part-3-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 phrasel verbs" 
        })
    ]
])

hearManager.hear(/^Go out or stay in/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "Choose the verb",
        keyboard: goout
    })
})

const goout = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Go out`,
            url: "https://dictionary.cambridge.org/dictionary/english-russian/go-out"
        }),
        Keyboard.urlButton({
            label: `Stay in`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/stay-in"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            payload: "part3pva2",
            color: "negative"
        })
    ]
])

hearManager.hear(/^Run business/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "To organise and control business"
    })
})

hearManager.hear(/^Can't wait to/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        attachment: "photo-205320016_457239033"
    })
})

hearManager.hear(/^Fill smth in/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        attachment: "photo-205320016_457239032"
    })
})

hearManager.hear(/^Tidy up/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        attachment: "photo-205320016_457239031"
    })
})

const part4pva2 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Grow up`,
            url: "http://www.correctenglish.ru/reference/phrasal-verbs/search/?idiom=Grow+up&criteria=name"
        }),
        Keyboard.urlButton({
            label: `Lie down`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/lie-down"
        }),
        Keyboard.urlButton({
            label: `Try on`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/try-sth-on"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Give back`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/give-sth-back?q=Give+back"
        }),
        Keyboard.urlButton({
            label: `Put back`,
            url: "https://dictionary.cambridge.org/ru/словарь/англо-русский/put-sth-back?q=Put+back"
        }),
        Keyboard.textButton({
            label: `Give someone a lift`
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/604338894/a2-phrasal-verbs-part-4-flash-cards/?new"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 phrasel verbs" 
        })
    ]
])

hearManager.hear(/^Give someone a lift/i, async(context) => {
    await vk.api.messages.send({
        peer_id: context.peerId,
        random_id: 0,
        message: "To take someone to a place by car"
    })
})

//Part 1 prepositional phrases A2 lvl
const part1ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Look at`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `A lot of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Thank to smb for smth`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Wait for`,
            payload: "A2",
            color: "primary"
        }),
        Keyboard.textButton({
            label: `For free`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Kind of smb`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Good at`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `A great way for`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-1-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Look at/i, async(context) => {
    context.send({message: `смотреть НА
Here are some examples:\n1) Look at me!\n2) What are you looking at?\n3) Students are looking at the teacher.`})
})

hearManager.hear(/^A lot of/i, async(context) => {
    context.send({message: `Много (чего-то)\n1) Have you got a lot of friends?\n2) There are a lot of nice things in this shop.\n3) We have a lot of different kinds of tea.`})
})


hearManager.hear(/^Thank to smb for smth/i, async(context) => {
    context.send({message: `Поблагодарить (КОГО-ТО) за (ЧТО-ТО)\nHere are some examples:
1) Thank you for your help.
2) Thank to my teacher I passed my exams ( благодаря моему учителю, я сдал экзамены)
3) I want to thank my parents for their amazing present 🎁`})
})

hearManager.hear(/^Wait for/i, async(context) => {
    context.send({message: `ждать (чего-то, кого-то)\nHEre are some examples:\n1) What are you doing here? - I'm waiting for my friends.\n2) Don't go! Wait for me!\n3) While we were waiting for the lesson to start, we chatted and laughed 😅.`})
})

hearManager.hear(/^For free/i, async(context) => {
    context.send({message: `Бесплатно\nHere are some examples:\n1) How much is that pen? - Oh, it's for free, take it!\n2) Catalogues are usually given for free.\n3) We didn't pay for water in the cafe, they gave it to us for free`})
})

hearManager.hear(/^Kind of smb/i, async(context) => {
    context.send({message: `это было мило/добро с (чьей-то) стороны\nHere are some examples:\n1) It was very kind of you to send me flowers when I was in the hospital 🏥\n2) Your son helped me to carry heavy bags 🎒home, it was very kind of him.\n3) It's so kind of you to offer me your help`})
})

hearManager.hear(/^Good at/i, async(context) => {
    context.send({message: `хорош В (чем-то)\nHere are some examples:
1) Are you good at school 🏫?
2) I'm good at maths, and you?
3) My cousin is very good at playing football ⚽`})
})

hearManager.hear(/^A great way for/i, async(context) => {
    context.send({message: `хороший способ чтобы\nHere are some examples:
1) Watching English films is a good way for learning new words = to learn new words
2) Going to the gym is a great way for keeping fit = to keep fit
3) Walking 🚶‍♂ is a great way for tourists to learn a city.`})
})



const part2ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Most or some of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Interested in`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Next to`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `For a few days`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On foot`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `From all over ~the word~`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Prefer… to...`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Instead of`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-2-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Most or some of/i, async(context) => {
    context.send({message: `многие/ некоторые ИЗ\nHere are some examples:
1) Some of our students are in Moscow now.
2) Most of our teachers are women.
3) English is understood by most people.`})
})

hearManager.hear(/^Interested in/i, async(context) => {
    context.send({message: `интересоваться (чем-то)\nHere are some examples:
1) I'm interested in physics.
2) He is not interested in sport.
3) I don't have a favourite singer, because I am not interested in music`})
})

hearManager.hear(/^Next to/i, async(context) => {
    context.send({message: `рядом С\nHere are some examples:
1) My house is next to the shopping mall 🍊
2) Paul is sitting next to me at school.
3) His flat is next to mine.`})
})

hearManager.hear(/^For a few days/i, async(context) => {
    context.send({message: `(НА) несколько дней\nHere are some examples:
1) I'm going to Pskov for a few days
2) He is on a business trip, he's away for a few days.
3) Can I stay with you for a few days?`})
})

hearManager.hear(/^On foot/i, async(context) => {
    context.send({message: `пешком\nHere are some examples:
1) -How do you get to school 🏫? 
-On foot
2) I go to school on foot.
3) They won't take a bus, they'll walk on foot.`})
})

hearManager.hear(/^From all over ~the word~/i, async(context) => {
    context.send({message: `СО всего ~мира~\nHere are some examples:
1) I have friends from all over the world 🌎
2) Santa 🎅 gets letters from all over the world`})
})

hearManager.hear(/^Prefer… to.../i, async(context) => {
    context.send({message: `предпочитать (ЧТО-ТО ЧЕМУ-ТО)\nHere are some examples:
1) I prefer tea 🍵 to coffee ☕
2) When I travel I prefer trains 🚆to buses 🚌 because trains are more comfortable
3) He prefers chocolate to ice cream, so buy him a bar of chocolate 🍫 better`})
})

hearManager.hear(/^Instead of/i, async(context) => {
    context.send({message: `вместо (чего-то)\nHere are some examples:
1) Today we had maths instead of biology because our maths teache is ill 🤒.
2) Let's buy fruits instead of cakes. Fruits are more healthy.
3) I made a mistake, I said "goed" instead of "went"`})
})

const part3ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Close to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Pay for`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Far away`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Different from`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `In a hurry`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `The same as`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Together with`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Listen to`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-3-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Close to/i, async(context) => {
    context.send({message: `рядом С\nHere are some examples:
1) He lives close to me.
2) There aren't any supermarkets close to my house.
3) My house is very close to my school 🏫, so I go to school on foot`})
})

hearManager.hear(/^Pay for/i, async(context) => {
    context.send({message: `платить ЗА\nHere are some examples:
1) We should pay for these drinks 🍸first and then leave.
2) My dad pays for my education.
3) How much did you pay for the tickets?`})
})

hearManager.hear(/^Far away/i, async(context) => {
    context.send({message: `далеко\nHere are some examples:
1) The school is really far away.
2) I live in the village, it's so far away.
3) Don't go far away!`})
})

hearManager.hear(/^Different from/i, async(context) => {
    context.send({message: `отличается (ОТ)\nHere are some examples:
1) My bag 🎒 is different from yours.
2) He has always been different from other students
3) School food is very different from home-made food 😋`})
})

hearManager.hear(/^In a hurry/i, async(context) => {
    context.send({message: `В спешке\nHere are some examples:
1) I was in a hurry and forgot to switch off the light.
2) Let's discuss it later, I'm in a hurry.
3) He is in a hurry because he is late for school.`})
})

hearManager.hear(/^The same as/i, async(context) => {
    context.send({message: `такой же КАК\nHere are some examples:
1) My bag 🎒is the same as yours.
2) It's rainy today...- Yeah, the same as yesterday.
3) The price for two is not the same as for one.`})
})

hearManager.hear(/^Together with/i, async(context) => {
    context.send({message: `вместе С\nHere are some examples:
1) I was walking 🚶‍♀together with my friends
2) He did it together with his brother.
3) Do you want to do the project together with me? `})
})

hearManager.hear(/^Listen to/i, async(context) => {
    context.send({message: `слушать (кого-то, что-то)\nHere are some examples:
1) Do you like listening to music?
2) Students are listening to their teacher.
3) He listens to his favorite song.`})
})

const part4ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `As often as ~you want~`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Come to or from`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On my phone`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `As soon as ~possible~`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Arrive at`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At last = finally`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `On the website`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Far from`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-4-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^As often as ~you want~/i, async(context) => {
    context.send({message: `ТАК часто КАК (ты хочешь)\nHere are some examples:
1) You may practice new words in the application as often as you want. 😉
2) I can't buy you sweets as often as you want
3) He trained as often as he could`})
})

hearManager.hear(/^Come to or from/i, async(context) => {
    context.send({message: `приходить/приезжать/прибывать (куда-то, откуда-то)\nHere are some examples:
1) I came to America from Russia (я приехал в Америку из России)
2) He will be late, because he is coming from another part of the city.
3) Come to my house today!`})
})

hearManager.hear(/^On my phone/i, async(context) => {
    context.send({message: `НА моем телефоне\nHere are some examples:
1) I have lots of different applications on my phone 📱
2) How much memory have you got on your phone?
3) I've got an excellent camera on my phone 📱`})
})

hearManager.hear(/^As soon as ~possible~/i, async(context) => {
    context.send({message: `КАК можно скорее\nHere are some examples:
1) Please call me as soon as possible (позвони мне как можно скорее= срочно)
2) Write your parents ASAP (as soon as possible), they need your help.
3) This should be done as soon as possible (ASAP)`})
})

hearManager.hear(/^Arrive at/i, async(context) => {
    context.send({message: `прибывать (куда-то)\nHere are some examples:
1) We're arriving at the bus station 🚉at 1:00.
2) He arrived at school 🏫late today.
3) What time will you arrive at the party?`})
})

hearManager.hear(/^At last = finally/i, async(context) => {
    context.send({message: `В конце концов, наконец\nHere are some examples:
1) We were driving long hours when we at last saw 👀 a petrol station ⛽
2) Fuh, I have at last finished my HW
3) At last we arrived at the hotel and slept`})
})

hearManager.hear(/^On the website/i, async(context) => {
    context.send({message: `НА сайте (все, что с интернетом - в английском говорим ON: ON the website, ON the internet, ON Vk, ON WhatsApp и др)\nHere are some examples:
1) I can find out about prices on the website.
2) The forecast on the website is wrong.
3) What's your favorite website? - YouTube, I can watch on it interesting videos`})
})

hearManager.hear(/^Far from/i, async(context) => {
    context.send({message: `далеко ОТ\nHere are some examples:
1) I live far from my school.
2) His house is far from his office.
3) Pskov is not far from St.Petersburg. `})
})

const part5ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `As well as`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Full of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `In fact`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Take a picture of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `In other words`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At the end`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `For fun`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Make changes to`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-5-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^As well as/i, async(context) => {
    context.send({message: `также КАК\nHere are some examples:
1) I like English teacher as well as Russian teacher.
2) I am good at playing football as well as at playing basketball
3) She speaks English as well as she speaks Russian.)`})
})

hearManager.hear(/^Full of/i, async(context) => {
    context.send({message: `полон ЧЕГО-ТО\nHere are some examples:
1) My bag is full of my school things.
2) The book was full of beautiful pictures
3) The box is full of photos 📷`})
})

hearManager.hear(/^In fact/i, async(context) => {
    context.send({message: `НА самом деле\nHere are some examples:
1) In fact, the travelling was very pleasant.
2) I was afraid to go to Cambridge club, but in fact it was really cool 😎
3) In fact, my dad is a kind and strong 💪 man 👨`})
})

hearManager.hear(/^Take a picture of/i, async(context) => {
    context.send({message: `сделать фото (чего-то, кого-то)\nHere are some examples:
1) I like taking photos of my pets, they're really cute.
2) She took a beautiful photo of the rainbow.
3) Did you take a photo of Billie Eilish when you were on her concert?`})
})

hearManager.hear(/^In other words/i, async(context) => {
    context.send({message: `другими словами\nHere are some examples:
1) I'm exhausted 😴, in other words I'm very tired.
2) My dad is a pilot, in other words he is a cool man.
3) I read the whole book in one evening, in other words it was really interesting`})
})

hearManager.hear(/^At the end/i, async(context) => {
    context.send({message: `В конце\nHere are some examples:
1) The book had an interesting twist at the end.
2) The film was so sad that everyone was crying 😢 at the end.
3) I didn't see what happened at the end.`})
})

hearManager.hear(/^For fun/i, async(context) => {
    context.send({message: `ДЛЯ забавы, РАДИ веселья\nHere are some examples:
1) Everything we planned for the birthday party was for fun.
2) Come on, let's play, don't take it seriously, it's just for fun.
3) He programmed this application for fun.`})
})

hearManager.hear(/^Make changes to/i, async(context) => {
    context.send({message: `вносить изменения В\nHere are some examples:
1) Here is your new timetable, we've made some changes to it.
2) When authors write books, they always make changes to them.
3) Let's make some changes for the program`})
})

const part6ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `For the first time`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Help with ~HW~`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On a ~business~ trip`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Say hеllo or goodbye to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Have time for ~hobbies~`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Share with`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `At least or first`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Two of us`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-6-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^For the first time/i, async(context) => {
    context.send({message: `В первый раз\nHere are some examples:
1) In London I tried fish&chips for the first time.
2) I see my grandmother 👵 for the first time
3) I'm sorry, I made so many mistakes, but it is because I did this work for the first time`})
})

hearManager.hear(/^Help with ~HW~/i, async(context) => {
    context.send({message: `помогать С ~ДЗ~\nHere are some examples:
1) My elderly sister sometimes helps me with my HW.
2) Can you help me with my school project?
3) I always help my mum with house chores`})
})

hearManager.hear(/^On a ~business~ trip/i, async(context) => {
    context.send({message: `В ~бизнесс~ поездке\nHere are some examples:\n1) Daddy said, I'd go on a trip\n2) You already told me that I could go on a trip with Jeremy.\n3) We could just pack some things and go on a trip.`})
})

hearManager.hear(/^Say hеllo or goodbye to/i, async(context) => {
    context.send({message: `здороваться, прощаться С, передавать привет/пока (кому-то)\nHere are some examples:
1) Please say hello to all your family (пожалуйста, передай привет всей своей семьи)
2) It is polite to say hello to people.
3) When you come to Cambridge club, you have to say hello to all teachers and students there`})
})

hearManager.hear(/^Have time for ~hobbies~/i, async(context) => {
    context.send({message: `иметь время НА ~Хобби~\nHere are some examples:
1) I have so much school HW that I don't have time for playing games
2) Do you have some time for me? I need to talk to you.
3) You always have time for chatting with friends online and surfing the internet, but you never have time for doing extra exercises`})
})

hearManager.hear(/^Share with/i, async(context) => {
    context.send({message: `(раз)делить С\nHere are some examples:
1) I don't have my own room, I share it with my younger sister.
2) You don't have a book? I can share mine with you.
3) Please feel free to share my lunch with me.`})
})

hearManager.hear(/^At least or first/i, async(context) => {
    context.send({message: `AT least - ПО крайней мере, минимум\nAT first - сначала\nHere are some examples:
1) To understand native speakers you must have at least A2 level of English.
2) At first I was very shy in my English classes.
3) Give me AT least 3 examples of ....`})
})

hearManager.hear(/^Two of us/i, async(context) => {
    context.send({message: `двое ИЗ нас\nHere are some examples:
1) Only two of us completed the task on time.
2) Three of them can speak English very well.
3) Two of my cousins live in Australia`})
})

const part8ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Because of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Compete against`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `At the age of`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Proud of`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On the internet`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Take care of`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Be late for`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Make money from`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-8-prepostional-phrases/sets"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])



hearManager.hear(/^Compete against/i, async(context) => {
    context.send({message: `соревноваться С\nHere are some examples:
1) Liverpool competes with Manchester tonight.
2) Tonight we're competing with a team from another school.
3) Teenagers like to compete with each other`})
})

hearManager.hear(/^At the age of/i, async(context) => {
    context.send({message: `В возрасте (таком-то)\nHere are some examples:
1) When you will be at my age, you will think the same as me now.
2) I could swim at the age of 4.
3) Nowadays young people usually get married at the age of 25-30.`})
})

hearManager.hear(/^Proud of/i, async(context) => {
    context.send({message: `гордиться (кем-то, чем-то)\nHere are some examples:
1) My parents are very proud of me
2) I've won! I'm proud of myself.
3) Our teacher is proud of us because we showed great 👍 results in the exam`})
})

hearManager.hear(/^On the internet/i, async(context) => {
    context.send({message: `НА сайте (все, что с интернетом - в английском говорим ON: ON the website, ON the internet, ON Vk, ON WhatsApp и др)\nHere are some examples:
1)I can find out about prices on the website.
2) The forecast on the website is wrong.
3) What's your favorite website? - YouTube, I can watch on it interesting videos`})
})

hearManager.hear(/^Take care of/i, async(context) => {
    context.send({message: `беречь, заботиться О\nHere are some examples:
1) Please take care of yourself ( будь осторожен, береги себя)
2) Usually in big families 👪 older brothers and sisters take care of younger children
3) Take care of your mum, she need your help and support`})
})

hearManager.hear(/^Be late for/i, async(context) => {
    context.send({message: `опаздывать НА (или куда-то)\nHere are some examples:
1) Why were you late for school today?
2) He was late for the party
3) Don't be late for your English classes!`})
})

hearManager.hear(/^Make money from/i, async(context) => {
    context.send({message: `зарабатывать НА (или чем-то)\nHere are some examples:
1) They make money from selling old things
2) I make money from my lessons
3) She makes money from her stories`})
})

const part7ppa2 = Keyboard.keyboard([
    [
        Keyboard.textButton({
            label: `Belong to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `According to`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `On TV`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `At any time`,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Famous for`,
            color: "primary"
        })
    ],
    [
        Keyboard.textButton({
            label: `Afraid of `,
            color: "primary"
        }),
        Keyboard.textButton({
            label: `Go for or on a ride`,
            color: "primary"
        })
    ],
    [
        Keyboard.urlButton({
            label: `Quizlet`,
            url: "https://quizlet.com/CambridgeEnglishClub/folders/a2-part-7-prepostional-phrases?x=1xqU&i=pgi11"
        }),
        Keyboard.textButton({
            label: `Other parts`,
            color: "positive",
		    payload: "A2 prepositional phrases" 
        })
    ]
])

hearManager.hear(/^Belong to/i, async(context) => {
    context.send({message: `принадлежать (кому)\nHere are some examples:
1) This bag 🎒belongs to our te
acher, Mr. Morey
2) Don't touch it! It belongs to my family 👪
3) Does it belong to you?`})
})

hearManager.hear(/^According to/i, async(context) => {
    context.send({message: `согласно (чему-то)\nHere are some examples:
1) Choose the answer according to the text.
2) According to the latest research, 95% of people don't get enough sleep.
3) According to the article, most of people eat unhealthy food`})
})

hearManager.hear(/^On TV/i, async(context) => {
    context.send({message: `ПО телевизору\nHere are some examples:
1) There is nothing interesting on TV tonight.
2) I saw this film on TV 📺
3) I can watch this football match on TV`})
})

hearManager.hear(/^At any time/i, async(context) => {
    context.send({message: `В любое время\nHere are some examples:
1) You can come back at any time
2) I am here for you at any time
3) Don't worry, you can call me at any time`})
})

hearManager.hear(/^Famous for/i, async(context) => {
    context.send({message: `известен (чем)\nHere are some examples:
1) Messi is famous for his unique game playing manner
2) Russia is famous for bears 🐻
3) Our town is famous for hot air balloon festival`})
})

hearManager.hear(/^Afraid of/i, async(context) => {
    context.send({message: `бояться (кого-то, чего-то)\nHere are some examples:
1) Are you afraid of dogs?
2) This teacher is so strict that I am afraid of him.
3) Don't be afraid of spiders, they are very small`})
})

hearManager.hear(/^Go for or on a ride/i, async(context) => {
    context.send({message: `ездить НА велосипедную прогулку\nHere are some examples:
1) What are you doing tomorrow? Let's go on a bike 🏍ride!
2) The weather is sunny, I am going for a ride with my friends.
3) I like going on a ride with my friends`})
})

const backmenuA2 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Author`,
            url: "https://vk.com/cambridgeteacher"
        })
        
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",
            payload: "A2"
        })
    ]
])

const backmenuB1 = Keyboard.keyboard([
    [
        Keyboard.urlButton({
            label: `Author`,
            url: "https://vk.com/cambridgeteacher"
        })
    ],
    [
        Keyboard.textButton({
            label: `Back`,
            color: "negative",
            payload: "B1"
        })
    ]
])


hearManager.hear(/^Back/i, async(context) => {
    if(context.messagePayload == "A2") {
        await vk.api.messages.send({
            peer_id: context.peerId,
            random_id: 0,
            message: "Ok, now choose what you want to learn",
            keyboard: vidgetA2
        
        })
    }
    else if(context.messagePayload == "B1") {
        await vk.api.messages.send ({
            peer_id: context.peerId,
            random_id: 0,
            message: "Ok, now choose what you want to learn",
            keyboard: vidgetB1
        })
    }
    else if(context.messagePayload == "choise") {
        await vk.api.messages.send ({
            peer_id: context.peerId,
            random_id: 0,
            message: "Hello, I’m your A2-B1 lvl Cambridge assistant\nNow choose your lvl!",
            attachment: "photo-205320016_457239022",
            keyboard: ready
        })
    }
    else if(context.messagePayload == "pvb1part1") {
        await vk.api.messages.send ({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are some phrases, you can click on them and go to dictionary",
            keyboard: part1pvb1
        })
    }
    else if(context.messagePayload == "part2pva2") {
        await vk.api.messages.send ({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are some phrases, you can click on them and go to dictionary",
            keyboard: part2pva2
        })
    }
    else if(context.messagePayload == "part3pva2") {
        await vk.api.messages.send ({
            peer_id: context.peerId,
            random_id: 0,
            message: "Here are some phrases, you can click on them and go to dictionary",
            keyboard: part3pva2
        })
    }
})



async function run() {
    await vk.updates.start();
    console.log("LESSSS GOOOOOOOOOOOO");
}
run().catch(console.error);

//conn.end(err => {if(err) {console.log(err)}else {console.log("Database stopped")}})


