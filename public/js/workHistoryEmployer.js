// console.log('ggggggggggggggggggggggggggg')
//
// function rankFunc(id) {
//     // let wrap = document.createElement('div');
//     // wrap.setAttribute('class', 'text-muted');
//     // wrap.innerHTML = '<button onclick="reply(\'sad\')" type="button" value="sad" class="btn feel"><i class="fa fa-frown-o fa-3x"></i></button><button onclick="reply(\'neutral\')" type="button" value="neutral" class="btn feel"><i class="fa fa-meh-o fa-3x"></i></button><button onclick="reply(\'happy\')" type="button" value="happy" class="btn feel"><i class="fa fa-smile-o fa-3x"></i></button><hr>'
//
//
//     console.log("rank fun")
//     console.log(id)
//     swal({
//         title: "Rate me!",
//         text: "Write something interesting:",
//         type: "input",
//         showCancelButton: true,
//         closeOnConfirm: false,
//         inputPlaceholder: "Write something"
//     }, async function (inputValue) {
//         // if (inputValue === false) return false;
//         if (inputValue === "") {
//             swal.showInputError("You need to write something!");
//             return false
//         }
//         if(inputValue){
//             try {
//                 const res = await fetch('/rateContractor', {
//                     method: 'POST',
//                     body: JSON.stringify({id,"recommendation": inputValue}),
//                     headers: {'Content-Type': 'application/json'}
//                 })
//                 const data = await res.json()
//                 if (data) {
//                     swal("Nice!", "You wrote: " + inputValue, "success");
//
//                 }
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//
//     });
//
// }

function ask() {
    let wrap = document.createElement('div');
    // wrap.setAttribute('class', 'text-muted');
    wrap.innerHTML = '<h1>333333333333</h1><button onclick="reply(\'sad\')" type="button" value="sad" class="btn feel"><i class="fa fa-frown-o fa-3x"></i></button><button onclick="reply(\'neutral\')" type="button" value="neutral" class="btn feel"><i class="fa fa-meh-o fa-3x"></i></button><button onclick="reply(\'happy\')" type="button" value="happy" class="btn feel"><i class="fa fa-smile-o fa-3x"></i></button><hr>'

    swal({
        title: "",
        text: "How do you like the new features?",
        icon: "info",
        className: '',
        closeOnClickOutside: false,
        // content: {
        //     element: wrap
        // },
        content: wrap,

        buttons: {
            confirm: {
                text: "Close",
                value: '',
                visible: true,
                className: "btn btn-default",
                closeModal: true,
            }
        },
    }).then((value) => {
        if (value === 'sad') {
            swal("Sorry!", {
                icon: "error",
                buttons: false
            });
        } else if (value === 'neutral') {
            swal("Okay!", {
                icon: "warning",
                buttons: false
            });
        } else if (value === 'happy') {
            swal("Hooray!", {
                icon: "success",
                buttons: false
            });
        }
    });
}

function reply(feel){
    swal.setActionValue(feel);
}



