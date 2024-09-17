use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn bridge(url: &str, body: &str, f: &js_sys::Function) -> Result<JsValue, JsValue> {
    let r = f.call2(&JsValue::null(), &JsValue::from_str(url), &JsValue::from_str(body))?;
    Ok(r)
}
