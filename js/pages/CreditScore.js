export async function CreditScore() {


    return `
        <section class="container-fluid credit-score-section">
            <div class="row">
                <div class="col">
                    <h1>Credit Score Configuration</h1>
                    <div class="col-6">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Grade</th>
                                    <th>Description</th>
                                    <th>Score</th>
                                    <th>Highest Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Length of Stay</th>
                                    <td>LOS1</td>
                                    <td><= 6 mths</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>LOS2</td>
                                    <td>between 7 and 12 mths</td>
                                    <td>20</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>LOS3</td>
                                    <td>between 13 and 24 mths</td>
                                    <td>30</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>LOS4</td>
                                    <td>between 25 and 36 mths</td>
                                    <td>40</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>LOS5</td>
                                    <td>>36 mths</td>
                                    <td>50</td>
                                    <td>50</td>
                                </tr>
                                

                                <tr>
                                    <th>Invoice Overdue Status</th>
                                    <td>LOS1</td>
                                    <td>current</td>
                                    <td>25</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>IOS2</td>
                                    <td>aging30</td>
                                    <td>15</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>IOS3</td>
                                    <td>aging60</td>
                                    <td>0</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>IOS4</td>
                                    <td>aging90</td>
                                    <td>0</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>IOS5</td>
                                    <td>>aging120</td>
                                    <td>0</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>IOS6</td>
                                    <td>>over120</td>
                                    <td>0</td>
                                    <td>25</td>
                                </tr>



                                <tr>
                                    <th>Payment Trend</th>
                                    <td>PT6</td>
                                    <td>6 payments before due</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>PT5</td>
                                    <td>5 payments before due</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>PT4</td>
                                    <td>4 payments before due</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>PT3</td>
                                    <td>3 payments before due</td>
                                    <td>5</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>PT2</td>
                                    <td>>2 payments before due</td>
                                    <td>5</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>PT1</td>
                                    <td>>1 payment before due</td>
                                    <td>5</td>
                                    <td>10</td>
                                </tr>


                                <tr>
                                    <th>ARPU</th>
                                    <td>ARPU1</td>
                                    <td>>300</td>
                                    <td>15</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>ARPU2</td>
                                    <td>>between 151 and 300</td>
                                    <td>10</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <th>&nbsp;</th>
                                    <td>ARPU3</td>
                                    <td>><151</td>
                                    <td>5</td>
                                    <td>15</td>
                                </tr>

                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><strong>Total</strong></td>
                                    <td><strong>100</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        
    `;
}