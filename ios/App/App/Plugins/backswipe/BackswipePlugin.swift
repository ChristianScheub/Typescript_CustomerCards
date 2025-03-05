//
//  BackswipePlugin.swift
//  App
//
//  Created by Christian Scheub on 16.09.24.
//

import Foundation
import Capacitor

@objc(BackswipePlugin)
public class BackswipePlugin: CAPPlugin {
   
    override public func load() {
        bridge?.webView?.allowsBackForwardNavigationGestures = true;
    }
}
