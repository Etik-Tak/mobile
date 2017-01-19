// Copyright (c) 2017, Daniel Andersen (daniel@trollsahead.dk)
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this
//    list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright notice,
//    this list of conditions and the following disclaimer in the documentation
//    and/or other materials provided with the distribution.
// 3. The name of the author may not be used to endorse or promote products derived
//    from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import { EditableItem } from "../model/editable-item"
import { Client } from "../model/client"

export class Util {
    static currentTime() {
      return new Date().getTime() / 1000.0
    }

    static buildUrl(url: string, params: {[index: string]: any}) : string {
      var completeUrl: string = url
      var delimiter = "?"
      for (var key in params) {
        completeUrl += delimiter
        completeUrl += key + "=" + encodeURIComponent(params[key])
        delimiter = "&"
      }
      return completeUrl
    }

    static getArrayItemWithKey(array: any[], key: string, value: string) : any {
      for (let item of array) {
        if (item["key"] == value) {
          return item
        }
      }
      return null
    }

    static canEditItemWithKey(itemKey: string, editableItems: EditableItem[]) : boolean {
      return Util.canEditItem(<EditableItem>Util.getArrayItemWithKey(editableItems, "key", itemKey))
    }

    static canEditItem(editableItem: EditableItem) : boolean {
      return editableItem.editable
    }

    static canEditItemWithKeyIfVerified(itemKey: string, editableItems: EditableItem[], client: Client) : boolean {
      return Util.canEditItemIfVerified(<EditableItem>Util.getArrayItemWithKey(editableItems, "key", itemKey), client)
    }

    static canEditItemIfVerified(editableItem: EditableItem, client: Client) : boolean {
      return client.trustLevel >= editableItem.trustScore
    }

}
