import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'

function Box({title , cases , total}) {
    return (
        <Card className="Box">
            <CardContent>
                <Typography className="Box_title">
                    {title}

                </Typography>
                <h3 className="Box_cases">
                    {cases}
                </h3>
                <Typography className="Box_total">
                    {total} 

                </Typography>
            </CardContent>

        </Card>
    )
}

export default Box
