import React, { Component } from "react";

class Terms extends Component {
  render() {
    return (
      <div>
        <div
          style={{ paddingTop: "20px", direction: "rtl" }}
          className="container"
        >
          <div  className="container">
            <h1 style={{textAlign:"center"}}>מדיניות החזרות</h1>
            <h3 style={{textAlign:"center"}}>לקוחות יקרים</h3>

            <div className="container">
              <ul>
                <h4>תקנון</h4>
                <br />
                <li>
                  ניתן לשלם באמצעי התשלום הבאים: כרטיס אשראי
                  {" "}
                  ומזומן (בחנות רח בן יהודה 14 שדרות)<span>
                    , paypal ,
                  </span>{" "}
                </li><br/>
                <li>
                  {" "}
                  החלפות והחזרות ניתן לבצע בתוך 14 יום מיום הרכישה כאשר המוצר
                  ארוז באריזתו המקורית ולא נעשה בו כל שימוש, עם הצגת הוכחת
                  רכישה.
                </li><br/>
                <li>
                  {" "}
                  החזר כספי (בניכוי 5% מערך הקנייה, אך לא יותר מ 100 שקלים) לכל
                  המוצרים (בלבד שהאריזה לא נפתחה).
                </li><br/>
                <li>
                  החלפה והחזרה של מוצרים, כנגד קבלת זיכוי, ניתן לבצע בתוך 14 יום
                  ממועד הרכישה.
                </li><br/>
                <li>
                  {" "}
                  .החזר כספי יבוצע בתוך 7 ימים בהתאם לתנאים הקבועים בתקנות
                </li><br/>
                <li>
                  {" "}
                  .כנגד החזרת המוצרים, עליהם לא חל החזר כספי על פי התקנון, יינתן
                  שובר זיכוי בלבד, שיהיה בתוקף של 6 חודשים בלבד מיום הנפקתו
                </li><br/>
                <li> .לא יינתן החזר כספי עבור דמי משלוח</li><br/>
                <li> החזרת המוצר ושליחתו חזרה הינה באחריותו של הלקוח בלבד.</li><br/>
                <li>
                  {" "}
                  לא ניתן להחזיר מוצרים כגון כיפות עם שם , או כיסוי עם שם וכל
                  מוצר שהוא נעשה בהזמנה מיוחדת .
                </li>
              </ul>
            </div>
          </div><br/>
          <div style={{textAlign:"center"}} className="container">
            <p>לכל שאלה נוספת או הערה ניתן ליצור קשר </p>
            <p>050-633-6828 , 08-68-99-600</p>
            <p>בכבוד ובברכה</p>
            <p>משה מויאל מנהל </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Terms;
