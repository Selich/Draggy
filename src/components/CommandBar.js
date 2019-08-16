import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core"

function CommandBar({hidden}) {
  return (
      <div hidden={hidden}>
        <Button value="Upload">Button</Button>
      </div>

  )
}
export default CommandBar