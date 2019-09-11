console.log("fdsfsdf");
fetch("/api/getTshirts")
.then(res => res.json())
.then(obj => {
    for (let i = 0; i < obj.tshirts.length; i++) {
        console.log(obj.tshirts);
        var row = document.getElementById("tbl").insertRow(-1);
        let tshirt = obj.tshirts[i]

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');

        td1.innerText = tshirt.firstName;
        td2.innerText = tshirt.lastName;
        td3.innerText = tshirt.type;
        td4.innerText = tshirt.size;
        td5.innerText = tshirt.color;
        td6.innerHTML = '<button class="button change" id='+tshirt.id+'>Change</button><button class="button del" id='+tshirt.id+'>Delete</button>';
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);
    }

    $('#table').append(row);

    $(".del").on("click", function(){
        var id = $(this).attr("id");
        // alert(id);
        console.log(id);
        $.post("api/deleteTshirt", { id: id}
        ).done(function(){
            window.location.href = "/T-shirts-table";
        })
        .fail(function(){
            alert("fail")
        })
    })

    $(".change").on("click", function(){

        var info = {};
        var row = $(this).parent().parent().find("td");
        info.firstName = $(row[0]).html();
        info.lastName = $(row[1]).html();
        info.type = $(row[2]).html();
        info.size = $(row[3]).html();
        info.color = $(row[4]).html();
        info.id =  $(this).attr("id");
        console.log(info);

        window.location.href = "T-shirt-edit?firstname=" + info.firstName + "&lastname=" + info.lastName + "&type=" + info.type + "&size=" + info.size + "&color=" + info.color + "&id=" + info.id;
    })
})