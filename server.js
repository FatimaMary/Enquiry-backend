const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
// const { request } = require("express");
const app = express();
// const PORT = process.env.PORT || 8081;

var corsOptions = {
    origin: "http://localhost:3000",
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    const newEnquiry = req.body;
    console.log(newEnquiry);

    let db = new sqlite3.Database("db/table.db");
    const insertQuery = "INSERT INTO NewTable(name, branch, location, phone, cell, email, qualification, selected, refer) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        newEnquiry.name,
        newEnquiry.branch,
        newEnquiry.location,
        newEnquiry.phone,
        newEnquiry.cell,
        newEnquiry.email,
        newEnquiry.qualification,
        newEnquiry.selected,
        newEnquiry.refer
    ];

    db.run(insertQuery, values, (err) => {
        if(err) {
            res.json({
                message: err.message,
            });
        } else {
            res.json({
                message: "Successfully inserted Enquiry"
            });
        }
    });
    db.close();
});

app.post("/admission", (request, response) => {
    const newAdmission = request.body;
    console.log(newAdmission);
    let db = new sqlite3.Database("db/table.db");

    const insertQuery = "INSERT INTO NewTable_1( name, fathername, branch, location, phone, cell, email, qualification, course, scheme, fees, idnumber) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const values = [
        newAdmission.name,
        newAdmission.fathername,
        newAdmission.branch,
        newAdmission.location,
        newAdmission.phone,
        newAdmission.cell,
        newAdmission.email,
        newAdmission.qualification,
        newAdmission.course,
        newAdmission.scheme,
        newAdmission.fees,
        newAdmission.idnumber
    ];
    db.run(insertQuery, values, (err) => {
        if(err) {
            response.json({
                message: err.message,
            });
        } else {
            response.json({
                message: "Admission Successfully"
            });
        }
    });
    db.close();
});

app.post("/fees", (request, response) => {
    const feesList = request.body;
    console.log(feesList);

    let db = new sqlite3.Database("db/table.db");

    const insertQuery = "INSERT INTO fees(course, fees) VALUES(?, ?)";

    const values = [
        feesList.course,
        feesList.fees
    ];
    db.run(insertQuery, values, (err) => {
        if (err) {
            response.json({
                message: err.message,
            });
        } else {
            response.json({
                message: "Inserted Successfully"
            });
        }
    });
    db.close(); 
});

app.get("/:id", (req, res) => {
    let db = new sqlite3.Database("db/table.db");

    const selectQuery = "SELECT id, name, branch, location, phone, cell, email, qualification, selected, refer from NewTable WHERE id =? ";

    db.all(selectQuery, [parseInt(req.params.id)], (err, enquires) => {
        if(err) {
            res.json({
                message: err.message,
            });
        } else {
                const enquiryEntries = enquires.map((singleEntry) => {
                    return {
                        id: singleEntry.id,
                        name: singleEntry.name,
                        branch: singleEntry.branch,
                        location: singleEntry.location,
                        phone: singleEntry.phone,
                        cell: singleEntry.cell,
                        email: singleEntry.email,
                        qualification: singleEntry.qualification,
                        selected: singleEntry.selected,
                        refer: singleEntry.refer
                    };
                });
                res.json(enquiryEntries[0]);
        }
    });
    db.close();
});

app.get("/fees", (req, res) => {
    let db = new sqlite3.Database("db/table.db");
 
    // const selectQuery = "SELECT id, course, fees from fees  ";
//     select st.stackId, st.name, sc.activity, sc.value, sc.date, sc.time 
// from StackTable st 
// INNER JOIN StackChange sc 
// on st.name = sc.name 
    const selectQuery = "SELECT f.course, a.course, a.fees from NewTable_1 as a INNER JOIN fees as f on f.course = f.course";

    db.all(selectQuery, [], (err, enquires) => {
        if(err) {
            res.json({
                message: err.message,
            });
        } else {
                const enquiryEntries = enquires.map((singleEntry) => {
                    return {
                        id: singleEntry.id,
                        course: singleEntry.course,
                        fees: singleEntry.fees
                    };
                });
                res.json(enquiryEntries);
        }
    });
    db.close();
});

app.get("/", (req, res) => {
    let db = new sqlite3.Database("db/table.db");

    const selectQuery = "SELECT id, name, branch, location, phone, cell, email, qualification, selected, refer from NewTable";

    db.all(selectQuery, [], (err, rows) => {
        if(err){
            res.json({
                message: err.message,
            });
        } else {
            const enquiryEntries = rows.map((singleEntry) => {
                return {
                    id: singleEntry.id,
                    name: singleEntry.name,
                    branch: singleEntry.branch,
                    location: singleEntry.location,
                    phone: singleEntry.phone,
                    cell: singleEntry.cell,
                    email: singleEntry.email,
                    qualification: singleEntry.qualification,
                    selected: singleEntry.selected,
                    refer: singleEntry.refer
                };
            });
            res.json(enquiryEntries)
        }
    });
    db.close();
});

app.get("/admission", (request, response) => {
    let db = new sqlite3.Database("db/table.db");

    const selectQuery = "SELECT admissionId, name, fathername, branch, location, phone, cell, email, qualification, course, scheme, fees, idnumber from NewTable_1";
//idnumber, name, fathername, branch, location, phone, cell, email, qualification, course, scheme, fees
    db.all(selectQuery, [], (err, rows) => {
        console.log(err, rows);
        if(err) {
            response.json({
                message: err.message,
            });
        } else {
            const admissionEntry = rows.map((singleAdmission) => {
                console.log(singleAdmission);
                return {
                    admissionId: singleAdmission.admissionId,
                    name: singleAdmission.name,
                    fathername: singleAdmission.fathername,
                    branch: singleAdmission.branch,
                    location: singleAdmission.location,
                    phone: singleAdmission.phone,
                    cell: singleAdmission.cell,
                    email: singleAdmission.email,
                    qualification: singleAdmission.qualification,
                    course: singleAdmission.course,
                    scheme: singleAdmission.scheme,
                    fees: singleAdmission.fees,
                    idnumber: singleAdmission.idnumber,
                };
            });
            response.json(admissionEntry);
            console.log(admissionEntry);
        };
    });
    db.close();
});

app.put("/", (req, res) => {
    const updatedEnquiry = req.body;
    let db = new sqlite3.Database("db/table.db");

    const updatedData = [updatedEnquiry.name, updatedEnquiry.branch, updatedEnquiry.location, updatedEnquiry.phone, updatedEnquiry.cell, updatedEnquiry.email, updatedEnquiry.qualification, updatedEnquiry.selected, updatedEnquiry.refer];

    const id = updatedEnquiry.id;

    const updatedQuery = "UPDATE NewTable SET name = ?, branch = ?, location = ?, phone = ?, cell = ?, email = ?, qualification = ?, selected = ?, refer = ? WHERE id = ?";
    const values = [...updatedData, id];

    db.run(updatedQuery, values, (err) => {
        if(err) {
            res.json({
                message: err.message,
            });
        } else {
            res.json({
                message: "Successfully updated data",
            });
        }
    });
    db.close();
});

app.delete("/", (req, res) => {
    const id = parseInt(req.body.id);

    let db = new sqlite3.Database("db/table.db");
    const values = [id]

    const deleteQuery = "DELETE FROM NewTable WHERE id = ?";

    db.run(deleteQuery, values, (err) => {
        if(err) {
            res.json({
                message: err.message,
            });
        } else {
            res.json({
                message: "Successfully Deleted"
            });
        }
    });
    db.close();
})

app.listen(8081, () => {
    console.log('Start Listening, use 8081')
})