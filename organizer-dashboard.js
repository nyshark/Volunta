// ======================================
// VOLUNTA ORGANIZER DASHBOARD JS
// VERSION 2
// ======================================


document.addEventListener("DOMContentLoaded", () => {



    // ==============================
    // TAB SYSTEM
    // ==============================


    const tabs = document.querySelectorAll(".organizer-tab");


    window.showTab = function(tabId){

        tabs.forEach(tab => {

            tab.style.display = "none";

        });


        document.getElementById(tabId).style.display = "block";

    };




    // ==============================
    // DATA
    // ==============================


    let opportunities =
    JSON.parse(
        localStorage.getItem("voluntaOpportunities")
    ) || [];



    const form =
    document.getElementById("opportunityForm");


    const list =
    document.getElementById("opportunityList");




    // ==============================
    // SAVE DATA
    // ==============================


    function save(){

        localStorage.setItem(

            "voluntaOpportunities",

            JSON.stringify(opportunities)

        );

    }




    // ==============================
    // RENDER OPPORTUNITIES
    // ==============================


    function render(){


        list.innerHTML = "";



        if(opportunities.length === 0){


            list.innerHTML = `

            <div class="contact-form-wrap">

                <h3>No opportunities yet.</h3>

                <p>
                Create your first volunteer event!
                </p>

            </div>

            `;


            return;

        }





        opportunities.forEach((opp,index)=>{



            const card =
            document.createElement("div");


            card.className =
            "contact-form-wrap";



            card.innerHTML = `



            ${
                opp.image
                ?
                `<img 
                src="${opp.image}"
                style="
                width:100%;
                border-radius:4px;
                margin-bottom:1rem;
                ">`
                :
                ""
            }



            <h2>

            ${opp.title}

            </h2>



            <p>
            📍 ${opp.city}, ${opp.state}
            </p>



            <p>

            📅 ${opp.date}

            </p>



            <p>

            ⏰ ${opp.start}
            -
            ${opp.end}

            </p>



            <p>

            👥
            0 /
            ${opp.limit}
            Volunteers

            </p>



            <button

            class="btn-send view-btn"

            data-index="${index}"

            >

            View Details

            </button>




            <button

            class="btn-send delete-btn"

            data-index="${index}"

            >

            Delete

            </button>



            `;



            list.appendChild(card);



        });



    }






    // ==============================
    // CREATE OPPORTUNITY
    // ==============================



    form.addEventListener(
    "submit",
    (e)=>{


        e.preventDefault();



        const imageInput =
        document.getElementById("oppImage");



        const file =
        imageInput.files[0];



        function createOpportunity(image=""){



            const opportunity = {



                id:
                Date.now(),



                title:
                document.getElementById("oppTitle").value,



                organization:
                document.getElementById("oppOrganization").value,



                address:
                document.getElementById("oppAddress").value,



                city:
                document.getElementById("oppCity").value,



                state:
                document.getElementById("oppState").value,



                zip:
                document.getElementById("oppZip").value,



                date:
                document.getElementById("oppDate").value,



                start:
                document.getElementById("oppStart").value,



                end:
                document.getElementById("oppEnd").value,



                limit:
                document.getElementById("oppLimit").value,



                category:
                document.getElementById("oppCategory").value,



                age:
                document.getElementById("oppAge").value,



                description:
                document.getElementById("oppDescription").value,



                image:image,



                students:[],

                attendance:[],

                pendingSignatures:[]



            };




            opportunities.push(opportunity);



            save();



            render();



            form.reset();



            showTab("opportunitiesTab");



        }





        if(file){


            const reader =
            new FileReader();



            reader.onload = function(){

                createOpportunity(reader.result);

            };



            reader.readAsDataURL(file);



        }


        else{


            createOpportunity();


        }



    });








    // ==============================
    // CARD BUTTONS
    // ==============================



    list.addEventListener(
    "click",
    (e)=>{



        const index =
        Number(
            e.target.dataset.index
        );



        // DELETE


        if(
            e.target.classList.contains("delete-btn")
        ){


            opportunities.splice(index,1);



            save();



            render();



            return;


        }





        // VIEW DETAILS


        if(
            e.target.classList.contains("view-btn")
        ){


            showDetails(index);


        }



    });

// ==============================
// DETAILS VIEW
// ==============================


function showDetails(index){


    const opp =
    opportunities[index];



    list.innerHTML = `


    <div class="contact-form-wrap opportunity-details-card">


    ${
        opp.image
        ?
        `<img
        src="${opp.image}"
        class="details-banner">
        `
        :
        ""
    }



    <h1>

    ${opp.title}

    </h1>




    <div class="detail-section">


    <h3>
    Hosted By
    </h3>


    <p>

    ${opp.organization}

    </p>


    </div>





    <div class="detail-section">


    <h3>
    📍 Location
    </h3>


    <p>

    ${opp.address}

    <br>

    ${opp.city},
    ${opp.state}
    ${opp.zip}

    </p>


    </div>





    <div class="detail-grid">



    <div>

    <h3>
    📅 Date
    </h3>

    <p>

    ${opp.date}

    </p>

    </div>





    <div>

    <h3>
    ⏰ Volunteer Window
    </h3>

    <p>

    ${opp.start}
    -
    ${opp.end}

    </p>

    </div>





    <div>

    <h3>
    👥 Capacity
    </h3>


    <p>

    ${opp.limit}
    volunteers

    </p>


    </div>





    <div>

    <h3>
    🏷 Category
    </h3>


    <p>

    ${opp.category}

    </p>


    </div>



    </div>





    <div class="detail-section">


    <h3>
    🎂 Minimum Age
    </h3>


    <p>

    ${opp.age || "No minimum age"}

    </p>


    </div>






    <div class="detail-section">


    <h3>
    About this Opportunity
    </h3>


    <p>

    ${opp.description}

    </p>


    </div>





    <hr>





    <div class="detail-section">


    <h3>
    Volunteer Management
    </h3>


    <p>

    👥 Volunteers

    <br>

    No students yet.

    </p>



    <p>

    ✓ Attendance

    <br>

    Coming later.

    </p>



    <p>

    ✎ Pending Signatures

    <br>

    None.

    </p>


    </div>





    <button

    id="backButton"

    class="btn-send">

    ← Back

    </button>




    </div>



    `;





    document
    .getElementById("backButton")
    .onclick = function(){


        render();


    };



}

    // ==============================
    // INITIAL LOAD
    // ==============================


    render();



});
