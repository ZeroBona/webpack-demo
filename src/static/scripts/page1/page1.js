import '../../assets/page1/css/page1.less'
console.log('来自page1的问候')
let page1result = [1, 2, 3].map((n) => n + 1)
console.log(page1result)
function haha (){
  return new Promise((res, rej) => {
    res('来自promise的问候')
  })
}

haha().then(result => {
  console.log(result)
})